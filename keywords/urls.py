# -*- coding: utf-8 -*-

from rest_framework import routers

from keywords import views
router = routers.SimpleRouter()

router.register(r'keywords', views.KeywordViewSet)
router.register(r'reports', views.KeywordReportViewSet)

urlpatterns = router.urls


