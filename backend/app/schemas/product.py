from pydantic import BaseModel

class ProductCreate(BaseModel):
    sku: str
    name: str
    price: float
    stock_quantity: int

class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True