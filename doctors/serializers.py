#-*- coding: utf-8 -*-

from django.core.urlresolvers import reverse

from rest_framework import serializers


from doctors.models import Doctor, Schedule, Patient

class ScheduleListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            'doctor_id': value.doctor.id,
            #'doctor_fullname': '%s %s' % (value.doctor.first_name, value.doctor.last_name),
            #'doctor_speciality': value.doctor.speciality,
        }


class PatientSerializer(serializers.ModelSerializer):
    #schedules = ScheduleListingField(many=True, read_only=True)

    class Meta:
        model = Patient
        # fields = ('first_name', 'last_name', 'info')
        fields = ('id',)


class ScheduleSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    hour_title = serializers.StringRelatedField(source='get_hour_display')

    class Meta:
        model = Schedule
        # fields = ('id', 'hour', 'hour_title', 'day_of_week', 'doctor', 'patient')

    def create(self, validated_data):
        patient = Patient.objects.create(**validated_data.pop('patient'))
        validated_data['patient'] = patient
        return Schedule.objects.create(**validated_data)


class DoctorSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = ('id', 'first_name', 'last_name', 'speciality', 'schedules')
