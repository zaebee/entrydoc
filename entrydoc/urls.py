"""entrydoc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin

from django.views.generic import TemplateView

urlpatterns = [
    #url(r'^$', TemplateView.as_view(template_name="base.html")),
    #url(r'^calculator/$', TemplateView.as_view(template_name="calculator.html"), name='calculator-ethereum'),
    url(r'^calculator/(?P<id>[\d]+)-(?P<name>[-()_.\w\d]+)/$$', TemplateView.as_view(template_name="calculator.html"), name='calculator-ethereum-detail'),
    #url(r'^ethereum/$', TemplateView.as_view(template_name="ethereum.html"), name='coin-ethereum')
]

urlpatterns += [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^admin/fiber/', include('fiber.admin_urls')),
    url(r'^api/v1/', include('crypto.urls')),
    url(r'^api/v2/', include('fiber.rest_api.urls')),
]

urlpatterns += [
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog', {'packages': ('fiber',),}),
    url(r'', 'fiber.views.page'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
