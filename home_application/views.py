# -*- coding: utf-8 -*-

from common.mymako import render_mako_context, render_json
from common.log import logger
import sys
from common.mymako import render_json
from home_application.tasks.sys import sync_sys_load_avg_main

reload(sys)
sys.setdefaultencoding('utf-8')


def home(request):
    """
    首页
    """
    logger.info(u'进入到首页！')
    sync_sys_load_avg_main(1)
    return render_mako_context(request, '/home_application/home.html', {'data': ''})


def page3(request):
    person = {'name': 'xiaoming'}
    return render_json(person)



