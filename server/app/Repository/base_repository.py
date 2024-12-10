from fastapi import Depends
from sqlalchemy.orm import Session
from app.DataStore import database

get_db = database.get_db

class BaseRepository:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db
