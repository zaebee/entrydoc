#-*- coding: utf-8 -*-

import json
import requests

from django.shortcuts import render

from rest_framework import viewsets, filters
from rest_framework.response import Response

from crypto.models import Keyword, KeywordReport, GraphicCard
from crypto.serializers import KeywordSerializer, KeywordReportSerializer, GraphicCardSerializer


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


class GraphicCardViewSet(viewsets.ViewSet):
    """
    A viewset for viewing and editing keyword report instances.
    """
    def list(self, request):
        result = requests.get('https://www.cryptocompare.com/api/data/miningequipment/')
        return Response(result.json()['MiningData'].values())

    def retrieve(self, request, pk=None):
        result = requests.get('https://www.cryptocompare.com/api/data/miningequipment/')
        result = result.json()
        return Response(result['MiningData'].get(pk))

    #serializer_class = GraphicCardSerializer
    queryset = GraphicCard.objects.all()


class HistoDayViewSet(viewsets.ViewSet):
    """
    A viewset for viewing and editing keyword report instances.
    """
    def list(self, request):
        tsym = request.query_params.get('tsym', 'USD')
        fsym = request.query_params.get('fsym', 'ETH')
        result = requests.get('https://www.cryptocompare.com/api/data/histoday/?aggregate=1&e=CCCAGG&fsym=%s&limit=93&tsym=%s' % (fsym, tsym))
        return Response(result.json())

    def retrieve(self, request, pk=None):
        #queryset = GraphicCard.objects.all()
        #user = get_object_or_404(queryset, pk=pk)
        #serializer = UserSerializer(user)
        return Response({})

    #serializer_class = GraphicCardSerializer
    queryset = GraphicCard.objects.all()
