import os

from celery import Celery
from dotenv import load_dotenv

from app.Config.email import fm, create_message
from asgiref.sync import async_to_sync

load_dotenv(".env")
celery = Celery()

celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL")
celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND")


@celery.task()
def send_email(recipients: list[str], subject: str, body: str):

    message = create_message(recipients=recipients, subject=subject, context=body)
    print(message)
    async_to_sync(fm.send_message)(message)
    print("Email sent")