# -*- coding: utf-8 -*-

from __future__ import absolute_import
import os

from entrydoc import celery_app as app
from bot.engines.scl import Spider

@app.task(name='bot.tasks.run_song')
def run_song(songid, goal_counter):
    spider = Spider(
	thread_number=2,
	config={
	    'song': songid,
	    'goal_counter': goal_counter,
	}
    )
    spider.run()
    return spider.render_stats()
