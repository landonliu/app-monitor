# from Crypto.Cipher import AES
# from Crypto import Random
# from conf.default import AES_KEY
# from common.log import logger
#
#
# def aes_encrypt(data):
#     bs = AES.block_size
#     pad = lambda s: s + (bs - len(s) % bs) * chr(bs - len(s) % bs)
#     iv = Random.new().read(bs)
#     cipher = AES.new(AES_KEY, AES.MODE_CBC, iv)
#     data = cipher.encrypt(pad(data))
#     data = iv + data
#     return data.encode('base64')
#
#
# def aes_decrypt(data):
#     try:
#         data = data.decode('base64')
#         bs = AES.block_size
#         if len(data) <= bs:
#             return data
#         unpad = lambda s: s[0:-ord(s[-1])]
#         iv = data[:bs]
#         cipher = AES.new(AES_KEY, AES.MODE_CBC, iv)
#         data = unpad(cipher.decrypt(data[bs:]))
#         return data
#     except Exception as e:
#         logger.exception()
#         return ''
