# -*- coding: utf-8 -*-

from django.conf.urls import patterns
from home_application.api import sys

urlpatterns = patterns('home_application.views',
                       # 首页--your index
                       (r'^$', 'home'),
                       (r'^get_sys_load_avg$', sys.get_sys_load_avg),
                       (r'^get_sys_load_avg_seq$', sys.get_sys_load_avg_seq),

                       )
