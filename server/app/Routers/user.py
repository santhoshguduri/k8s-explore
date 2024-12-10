from fastapi import APIRouter,Depends,Response,HTTPException, Cookie, Request
from app.Schemas import user as userSchema, token as TokenSchema
from fastapi.security import OAuth2PasswordBearer
from app.Services import auth_service
from app.Services.user_service import UserService

router = APIRouter(
    prefix="/user",
    tags=['Users'],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post('/create')
def create_user(request: userSchema.Signup, user_service: UserService = Depends()):
    db_user = user_service.get_user_by_email(email=request.email)
    if db_user and db_user.is_card_verified:
        raise HTTPException(status_code=400, detail="Email already registered")
    elif db_user:
        return db_user
    return user_service.create(request)

# @router.get('/{id}',response_model=userSchema.DisplayUser)
# def get_user(id:int,db: Session = Depends(get_db)):
#     return user.show(id,db) 

@router.get("/me", response_model=userSchema.DisplayUser)
def read_users_me(request: Request, user_service: UserService = Depends()):
    user_data = request.state.user
    return user_service.get_user_by_email(user_data.get('email'))

# @router.get('/check-user-exists')
# def check_user_exists(email):
#     return user.get_user_by_email(email, db=db)

