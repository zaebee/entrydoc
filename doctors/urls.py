# -*- coding: utf-8 -*-

from rest_framework import routers

from doctors import views
router = routers.SimpleRouter()

router.register(r'doctors', views.DoctorViewSet)
router.register(r'schedules', views.ScheduleViewSet)
router.register(r'patients', views.PatientViewSet)

urlpatterns = router.urls
