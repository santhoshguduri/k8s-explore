from fastapi import APIRouter,Depends
import stripe
from app.Schemas import user as userSchema
from app.Repository.card import CardRepository
from app.Services.user_service import UserService

stripe.api_key = "sk_test_51QP5dDKgrLAHVIRda1H13tSU1WPNLEkNODE7cyGRgnuGYcQQdmXCRD94Md81KVhKRGyQ5NN3IY6xeRDooLrX2Zo200lLRbVd3v"

class CardService:
    def __init__(self, user_service: UserService = Depends(), card_repo: CardRepository = Depends()):
        self.card_repo = card_repo
        self.user_service = user_service

    def verify_card(self, data: userSchema.CardRequest):
        payment_method_id = data.paymentMethodId

        customer = stripe.Customer.create(
            payment_method=payment_method_id,
            email=data.email,
            invoice_settings={"default_payment_method": payment_method_id},
        )

        payment_method = stripe.PaymentMethod.retrieve(payment_method_id)
        curUser = self.user_service.get_user_by_email(email= data.email)
        card_details =  {
            "brand": payment_method.card.brand,
            "last4": payment_method.card.last4,
            "exp_month": payment_method.card.exp_month,
            "exp_year": payment_method.card.exp_year,
            "customer_id": customer.id,
            "user_id": curUser.id
        }

        self.card_repo.create(card_details)

        curUser.is_card_verified=True
        self.user_service.update(curUser)