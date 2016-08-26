# coding: utf-8

import os
import logging
import requests

from grab.spider import Spider, Task

logger = logging.getLogger('grab')
#logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PROXYLIST_FILE = os.path.join(BASE_DIR, 'engines/proxylist.txt')
AGENTS_FILE = os.path.join(BASE_DIR, 'engines/agents.txt')


class BaseSpider(Spider):
    PLAYER_URL = 'http://www.soundclick.com/player/single_player.cfm?songid=%s'
    PASS_URL = 'http://www.soundclick.com/util/passkey.cfm?flash=true'
    PLAYLIST_URL = 'http://www.soundclick.com/util/xmlsong.cfm?songid=%s&passkey=%s&q=hi&ext=0'

    def create_grab_instance(self, **kwargs):
        g = super(BaseSpider, self).create_grab_instance(**kwargs)
        g.setup(user_agent_file=AGENTS_FILE)
        return g

    def prepare(self):
        # Prepare the file handler to save results.
        # The method `prepare` is called one time before the
        # spider has started working
        self.load_proxylist(PROXYLIST_FILE, source_type='text_file')
        self.proxy_auto_change = False

        self.song = self.config.get('song')
        self.engine = self.config.get('engine')
        self.goal_counter = self.config.get('goal_counter', 1)

        # This counter will be used to enumerate all success songs
        # to simplify image file naming
        self.result_counter = 0

    def task_generator(self):
        if self.song:
            url = self.PLAYER_URL % self.song
            for i in xrange(int(self.goal_counter)):
                self.proxylist.get_random_proxy()
                yield Task('song_player', url=url)

    def task_song_player(self, grab, task):
        logger.debug('Initial song player %s' % task.url)
        #elements = grab.doc.tree.cssselect(selector)
        url = self.PASS_URL
        yield Task('song_passkey', url=url, content_type='xml')

    def task_song_passkey(self, grab, task):
        if grab.response.code == 200:
            code = grab.response.xml_tree.text
            logger.debug('Get song passkey (%s)' % code)
            url = self.PLAYLIST_URL % (self.song, code)
            yield Task('song_playlist', url=url, content_type='xml')

    def task_song_playlist(self, grab, task):
        logger.debug('Get song playlist XML for %s' % task.url)
        playlist = grab.response.xml_tree
        if grab.response.code == 200:
            filename = playlist.find('item/filename').text
        url = requests.utils.unquote(filename)
        logger.debug('Download song file [%s]' % url)

    def task_song_stat(self, grab, task):
        logger.debug('Get song stat JS for %s' % task.url)
