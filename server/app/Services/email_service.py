from app.celery_worker import send_email


def send_otp_email(data):
    send_email.delay(
        recipients=[data.email],
        subject="Your OTP Code",
        body=f"<h1>Your OTP is: {data.otp}</h1>",
    )