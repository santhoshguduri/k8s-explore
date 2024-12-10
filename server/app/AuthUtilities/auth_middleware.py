from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.status import HTTP_401_UNAUTHORIZED
from jose import JWTError, ExpiredSignatureError, jwt 
from app.Routers import authentication, OTPRouter

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

PUBLIC_ROUTES=[
    "/user/create",
    "/card/verify",
]

def get_routes_from_routers(routers):
    for router in routers:
        for route in router.routes:
            PUBLIC_ROUTES.append(route.path)

# List of all public routers
public_routers = [authentication.router, OTPRouter.router]

# Extract public routes dynamically
get_routes_from_routers(public_routers)

async def auth_middleware(request: Request, call_next):
    path = request.url.path
    if path in PUBLIC_ROUTES:
        return await call_next(request)

    auth_header = request.headers.get("Authorization")
    print(request.headers)
    if not auth_header or not auth_header.startswith("Bearer "):
        return JSONResponse(
            {"detail": "Unauthorized - Missing or invalid token"},
            status_code=HTTP_401_UNAUTHORIZED,
        )

    token = auth_header.split(" ")[1]

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        request.state.user = { 'email': payload.get('sub')}
    except ExpiredSignatureError:
        return JSONResponse(
            {"detail": "Token expired"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    except JWTError:
        return JSONResponse(
            {"detail": "Invalid token"},
            status_code=HTTP_401_UNAUTHORIZED,
        )

    response = await call_next(request)
    return response
