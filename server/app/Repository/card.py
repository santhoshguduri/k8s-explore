from fastapi import HTTPException,status, Depends
from app.Models.User import CreditCard
from app.Repository.base_repository import BaseRepository

class CardRepository(BaseRepository):

    def create(self, card_details: dict):
        card_data = CreditCard(**card_details)

        self.db.add(card_data)
        self.db.commit()
        self.db.refresh(card_data)
        return card_data