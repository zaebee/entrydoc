# -*- coding: utf-8 -*-

from rest_framework import routers

from crypto import views
router = routers.SimpleRouter()

router.register(r'keywords', views.KeywordViewSet)
router.register(r'reports', views.KeywordReportViewSet)
router.register(r'devices', views.GraphicCardViewSet)
router.register(r'histoday', views.HistoDayViewSet)
router.register(r'price', views.PriceViewSet)

urlpatterns = router.urls


