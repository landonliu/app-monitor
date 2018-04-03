# -*- coding: utf-8 -*-
import settings
import json
import httplib2
from common.log import logger


class EsbClient:
    bk_token = ''

    def __init__(self, request):
        if request:
            self.bk_token = request.COOKIES.get(settings.BK_COOKIE_NAME, None)

    def call(self, module, chanel, **param):
        http = httplib2.Http()
        param['app_code'] = settings.APP_ID
        param['app_secret'] = settings.APP_TOKEN
        if self.bk_token:
            param['bk_token'] = self.bk_token

        headers = {'Content-type': 'application/json'}
        url = "{0}/api/c/compapi/{1}/{2}/".format(settings.BK_PAAS_HOST, module, chanel)
        response, content = http.request(url, 'POST', headers=headers, body=json.dumps(param))
        if response.status == 200:
            return json.loads(content)
        else:
            logger.error(u'请求esb接口{0}失败，result content:{1}'.format(url, content))
            return {'result': False, 'code': response.status, 'message': content}


def get_esb_client(request=None):
    return EsbClient(request)
