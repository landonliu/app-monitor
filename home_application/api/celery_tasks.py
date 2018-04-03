# -*- coding: utf-8 -*-

from common.mymako import render_json
from common.log import logger
from celery import task
import time
import datetime
from celery.schedules import crontab
from celery.task import periodic_task


@task
def async_task():
    logger.info(u'10s 延时开始')
    time.sleep(10)
    logger.info(u'10s 延时结束')


def execute_task(request):
    # async_task()
    # async_task.delay()
    async_task.apply_async(eta=datetime.datetime.now() + datetime.timedelta(seconds=20))
    return render_json({'result': 'ok'})


@periodic_task(run_every=crontab(minute='*/1', hour='*', day_of_week="*"))
def send_msg():
    now = datetime.datetime.now()
    logger.info(u"发送邮件成功，当前时间：{}".format(now))
