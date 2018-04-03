# -*- coding: utf-8 -*-
from home_application.helper import utilities as util
from common.log import logger
from home_application.models import SysLoadAvg
import json


# 获取系统负载
def get_sys_load_avg(request):
    try:
        last_load_avg = SysLoadAvg.objects.filter(app_id=1).last()
        return_data = {
            "load_avg_total": last_load_avg.load_avg_total,
            "load_avg_detail": json.loads(last_load_avg.load_avg_detail),
        }

        return util.render_success_json(return_data)
    except Exception as e:
        logger.exception("get_sys_load_avg error!")
        return util.render_fail_json("exception raise, msg:" + e.message)


# 获取系统负载
def get_sys_load_avg_seq(request):
    try:
        data = SysLoadAvg.objects.filter(time__gt=util.get_time_delta(minutes=-30), app_id=1).values("time",
                                                                                                     "load_avg_total")

        return util.render_success_json(list(data))
    except Exception as e:
        logger.exception("get_sys_load_avg error!")
        return util.render_fail_json("exception raise, msg:" + e.message)
