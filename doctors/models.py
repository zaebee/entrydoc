# -*- coding: utf-8 -*-

from django.db import models
from django.core.exceptions import ValidationError

def validate_working_day(value):
    day_of_week = value.weekday()
    print(day_of_week)
    # if day_of_week != 0 or day_of_week != 6:
    #    raise ValidationError('%s это не рабочий день' % value)
    delta = (value - value.today()).days
    if delta < 0:
        raise ValidationError('%s в прошлые дни приема нет' % value)


class Doctor(models.Model):
    first_name = models.CharField('Имя', max_length=200)
    last_name = models.CharField('Фамилия', max_length=200)
    speciality = models.CharField('Специальность', max_length=200)

    class Meta:
        verbose_name = 'Доктор'
        verbose_name_plural = 'Доктора'

    def __str__(self):
        return 'Доктор: %s %s' % (self.first_name, self.last_name)


class Patient(models.Model):
    first_name = models.CharField('Имя', max_length=200)
    last_name = models.CharField('Фамилия', max_length=200)
    info = models.TextField('Доп.инфа', blank=True, null=True)
    doctors = models.ManyToManyField(Doctor, through='Schedule', related_name='patients',
                                     blank=True, null=True)

    class Meta:
        verbose_name = 'Пациент'
        verbose_name_plural = 'Пациенты'

    def __str__(self):
        return 'Пациент: %s %s' % (self.first_name, self.last_name)


class Schedule(models.Model):
    # HOURS = tuple(map(lambda x: (x, '%s:00' % x), range(9,19)))
    HOURS = (
        (10, '10:00'),
        (105, '10:30'),
        (11, '11:00'),
        (115, '11:30'),
        (12, '12:00'),
        (125, '12:30'),
        (13, '13:00'),
        (135, '13:30'),
        (14, '14:00'),
        (145, '14:30')
    )


    day_of_week = models.DateField('День недели', validators=[validate_working_day])
    hour = models.PositiveIntegerField('Время', choices=HOURS)

    doctor = models.ForeignKey(Doctor, related_name='schedules')
    patient = models.ForeignKey(Patient, related_name='schedules', blank=True, null=True)

    class Meta:
        verbose_name = 'Расписание врача'
        verbose_name_plural = 'Расписание врачей'
        unique_together = ('day_of_week', 'hour', 'doctor')

    def __str__(self):
        return 'Запись на прием %s в %s' % (self.day_of_week.strftime('%d.%m.%Y'),
                                                          self.get_hour_display())

