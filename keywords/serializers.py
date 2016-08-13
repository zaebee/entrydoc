#-*- coding: utf-8 -*-

from django.core.urlresolvers import reverse

from rest_framework import serializers


from keywords.models import Keyword, KeywordReport


class KeywordReportSerializer(serializers.ModelSerializer):
    keyword = serializers.PrimaryKeyRelatedField(queryset=Keyword.objects.all())

    class Meta:
        model = KeywordReport


class KeywordSerializer(serializers.ModelSerializer):
    reports = KeywordReportSerializer(many=True, read_only=True)
    phrases = serializers.ReadOnlyField(source='get_phrases')

    class Meta:
        model = Keyword
        #fields = ('id', 'first_name', 'last_name', 'speciality', 'schedules')

    def create(self, validated_data):
        keyword = Keyword.objects.create(**validated_data)
        report = KeywordReport.objects.create(keyword=keyword)
        report.getWordstatReport()
        return keyword

