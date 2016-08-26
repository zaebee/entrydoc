# coding: utf-8

from base import BaseSpider


class Spider(BaseSpider):
    """ soundclick.com spider """

    selectors = [
        '.story-body-text.story-content a',
        '.story-meta h2'
    ]
