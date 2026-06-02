from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

print("=== MAIN.PY LOADED ===")

from app.database import Base, engine

# Import Models
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

# Import Routes
from app.routes import product
from app.routes import customer
from app.routes import order

print("=== CREATING DATABASE TABLES ===")
Base.metadata.create_all(bind=engine)
print("=== DATABASE TABLES CREATED ===")

app = FastAPI(
    title="Inventory Management System",
    description="Inventory & Order Management API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(product.router)
app.include_router(customer.router)
app.include_router(order.router)

@app.get("/")
def root():
    return {
        "message": "Inventory Management System API Running"
    }

print("=== FASTAPI APP STARTED ===")