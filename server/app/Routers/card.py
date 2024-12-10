from fastapi import APIRouter,Depends,Response,HTTPException, Cookie
import stripe
from app.Schemas import user as userSchema, token as TokenSchema
from app.Services import auth_service as AuthUtility
from app.Services.card_service import CardService

router = APIRouter(
    prefix="/card",
    tags=['Users'],
)

stripe.api_key = "sk_test_51QP5dDKgrLAHVIRda1H13tSU1WPNLEkNODE7cyGRgnuGYcQQdmXCRD94Md81KVhKRGyQ5NN3IY6xeRDooLrX2Zo200lLRbVd3v"

@router.post("/verify")
async def verify_card(data: userSchema.CardRequest, response: Response = None, card_service: CardService = Depends()):
    try:
        card_service.verify_card(data)

        access_token = AuthUtility.create_access_token(data={"sub": data.email})
        refresh_token = AuthUtility.create_refresh_token(data={"sub": data.email})

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            # secure=True,
            samesite="Strict",  # Prevent CSRF
        )

        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
