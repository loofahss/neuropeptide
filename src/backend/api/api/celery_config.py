BROKER_URL = "redis://:qwe123456!@127.0.0.1:6379/1"

CELERY_RESULT_BACKEND = "redis://:qwe123456!@127.0.0.1:6379/2"

CELERY_RESULT_SERIALIZER = 'json'

CELERY_TASK_RESULT_EXPIRES = 60 * 60 * 24 * 30 * 2