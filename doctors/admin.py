from django.contrib import admin

from .models import Doctor, Schedule, Patient


class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'speciality')
    list_display_links = ('id', 'first_name')

    class Meta:
        model = Doctor


class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_hour_display', 'day_of_week', 'doctor', 'patient',)
    list_filter = ('doctor', )
    date_hierarchy = 'day_of_week'

    class Meta:
        model = Schedule

class PatientAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'info')
    #list_display_links = ('id', 'first_name')

    class Meta:
        model = Patient


admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Patient, PatientAdmin)
