#-*- coding: utf-8 -*-

from django.shortcuts import render

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
