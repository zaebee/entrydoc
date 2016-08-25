# -*- coding: utf-8 -*-

import json
import requests
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from jsonfield import JSONField


class Keyword(models.Model):
    name = models.CharField(u'Имя', max_length=200)

    class Meta:
        verbose_name = u'Ключевое слово'
        verbose_name_plural = u'Ключевые слова'

    def __str__(self):
        return u'Фраза: %s' % (self.name)

    @property
    def get_phrases(self):
        return [self.name, self.name.join('""')]


class KeywordReport(models.Model):
    wordstat_id = models.PositiveIntegerField(u'Wordstat ID', blank=True, null=True)
    date_created = models.DateTimeField(u'Дата создания', auto_now=True)

    keyword = models.ForeignKey(Keyword, related_name='reports', blank=True, null=True)
    data = JSONField(u'Данные', blank=True, null=True)

    class Meta:
        verbose_name = u'Отчет вордстата'
        verbose_name_plural = u'Отчеты вордстата'

    def __str__(self):
        return u'Отчет yandex.wordstat %s в %s' % (self.wordstat_id, self.keyword)

    def createNewWordstatReport(self, phrases=[]):
        if self.wordstat_id:
            return {'data': self.wordstat_id}

        url = 'https://api.direct.yandex.ru/v4/json/'
        token = 'e24077b4eeff47b58fab4463daf7073d'
        phrases = phrases or self.keyword.get_phrases
        params = {
           'method': 'CreateNewWordstatReport',
           'token': token,
           'locale': 'ru',
           'param': {
               'Phrases': phrases
           }
        }
        data = json.dumps(params, ensure_ascii=False).encode('utf8')
        response = requests.post(url, data)
        return response.json()

    def getWordstatReport(self, report_id=None):
        if self.data:
            return self.data
        url = 'https://api.direct.yandex.ru/v4/json/'
        token = 'e24077b4eeff47b58fab4463daf7073d'
        params = {
           'method': 'GetWordstatReport',
           'token': token,
           'locale': 'ru',
           'param': report_id if report_id else self.wordstat_id,
        }
        data = json.dumps(params, ensure_ascii=False).encode('utf8')
        response = requests.post(url, data)
        return response.json()

    def getWordstatReportList(self, report_id=None):
        url = 'https://api.direct.yandex.ru/v4/json/'
        token = 'e24077b4eeff47b58fab4463daf7073d'
        params = {
           'method': 'GetWordstatReportList',
           'token': token,
           'locale': 'ru',
        }
        data = json.dumps(params, ensure_ascii=False).encode('utf8')
        response = requests.post(url, data)
        return response.json()


class GraphicCard(models.Model):
    name = models.CharField(u'название', max_length=200)

    class Meta:
        verbose_name = u'Видеокарта'
        verbose_name_plural = u'Видеокарты'

    def __str__(self):
        return u'Видеокарта: %s' % (self.name)


def getWordstatReport(sender, instance, created, **kwargs):
    if created:
        try:
            phrases = instance.data.get('phrases', [])
            print phrases
            result = instance.createNewWordstatReport(phrases=phrases)
            if result.get('error_detail'):
                instance.data = result
            else:
                instance.wordstat_id = result.get('data')
                result = instance.getWordstatReport(instance.wordstat_id)
                instance.data = result.get('data')
            instance.save()
        except:
            print 'FAIL'
            pass

models.signals.post_save.connect(getWordstatReport, sender=KeywordReport)
