from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = []

class User(BaseModel):
    name: str
    age: int

@app.get("/users")
def get_users():
    return users

@app.post("/users")
def create_user(user: User):
    users.append(user)
    return {"msg": "usuario criado com sucesso"}

@app.get("/users/{id}")
def get_user(id: int):
    if id < 0 or id >= len(users):
        return {"erro": "usuario nao encontrado"}
    return users[id]

@app.delete("/users/{id}")
def delete_user(id: int):
    if id < 0 or id >= len(users):
        return {"erro": "usuario nao encontrado"}
    users.pop(id)
    return {"msg": "usuario deletado com sucesso"}

@app.put("/users/{id}")
def update_user(id: int, user: User):
    if id < 0 or id >= len(users):
        return {"erro": "usuario nao encontrado"}
    users[id] = user
    return {"msg": "usuario atualizado com sucesso"}