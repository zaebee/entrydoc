# -*- coding: utf-8 -*-

from datetime import datetime, timedelta
from django.shortcuts import render

from django_ical.views import ICalFeed

from rest_framework import viewsets, filters
from rest_framework.response import Response

from doctors.models import Doctor, Schedule, Patient
from doctors.serializers import DoctorSerializer, ScheduleSerializer, PatientSerializer


class DoctorViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing doctor instances.
    """
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()


class ScheduleViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing schedule instances.
    """
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('doctor', 'day_of_week')


class PatientViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing patient instances.
    """
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()


class EventFeed(ICalFeed):
    """
    A simple event calender
    """
    product_id = '-//Yandex LLC//Yandex Calendar//EN'
    timezone = 'UTC'
    file_name = "event.ics"

    def items(self):
        return Schedule.objects.all().order_by('-day_of_week')

    def item_title(self, item):
        return item.patient

    def item_description(self, item):
        return '%s. Пациент: %s (%s)' % (
            item.doctor,
            item.patient,
            item.patient.info
        )

    def item_start_datetime(self, item):
        date = item.day_of_week.strftime('%Y%m%d')
        hour = item.get_hour_display().replace(':', '')
        start = date + hour
        start = datetime.strptime(start, '%Y%m%d%H%M')
        return start

    def item_end_datetime(self, item):
        start = self.item_start_datetime(item)
        end = start + timedelta(minutes=30)
        return end

    def item_link(self, item):
        return '/schedules/%s' % item.id

    def item_location(self, item):
        return 'Атмосфера'

    def item_categories(self, item):
        return 'new year'

    def item_transparency(self, item):
        return 'OPAQUE'
