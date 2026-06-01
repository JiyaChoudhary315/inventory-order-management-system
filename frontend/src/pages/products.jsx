import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    stock_quantity: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products/");
    setProducts(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products/", {
        sku: formData.sku,
        name: formData.name,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity)
      });

      setFormData({
        sku: "",
        name: "",
        price: "",
        stock_quantity: ""
      });

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating product");
    }
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <form onSubmit={createProduct}>
        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="stock_quantity"
          placeholder="Stock"
          value={formData.stock_quantity}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock_quantity}</td>

              <td>
                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;