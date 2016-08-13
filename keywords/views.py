#-*- coding: utf-8 -*-

import json
import requests

from django.shortcuts import render

from rest_framework import viewsets, filters
from rest_framework.response import Response

from keywords.models import Keyword, KeywordReport
from keywords.serializers import KeywordSerializer, KeywordReportSerializer


class KeywordViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing keyword instances.
    """
    serializer_class = KeywordSerializer
    queryset = Keyword.objects.all()


class KeywordReportViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing keyword report instances.
    """
    serializer_class = KeywordReportSerializer
    queryset = KeywordReport.objects.all()
