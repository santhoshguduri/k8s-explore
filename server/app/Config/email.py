import os
from pathlib import Path
from fastapi_mail import FastMail, MessageSchema, MessageType, ConnectionConfig
from fastapi.background import BackgroundTasks
# from app.config.settings import get_settings

# settings = get_settings()

conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("MAIL_USERNAME", "902c21925c97e4"),
    MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD", "c1803ec5970b9c"),
    MAIL_PORT=os.environ.get("MAIL_PORT", 2525),
    MAIL_SERVER=os.environ.get("MAIL_SERVER", "sandbox.smtp.mailtrap.io"),
    MAIL_STARTTLS=os.environ.get("MAIL_STARTTLS", False),
    MAIL_SSL_TLS=os.environ.get("MAIL_SSL_TLS", False),
    MAIL_DEBUG=True,
    MAIL_FROM=os.environ.get("MAIL_FROM", 'noreply@test.com'),
    # MAIL_FROM_NAME=os.environ.get("MAIL_FROM_NAME", settings.APP_NAME),
    # TEMPLATE_FOLDER=Path(__file__).parent.parent / "templates",
    USE_CREDENTIALS=os.environ.get("USE_CREDENTIALS", True)
)

fm = FastMail(conf)


def create_message(recipients: list, subject: str, context: str):
    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        body=context,
        subtype=MessageType.html
    )

    return message

    # await fm.send_message(message)
    # background_tasks.add_task(fm.send_message, message, template_name=template_name)