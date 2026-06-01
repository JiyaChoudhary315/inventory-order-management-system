import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    quantity: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await api.get("/orders/");
    setOrders(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/", {
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity)
      });

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  return (
    <div>
      <h1>Orders</h1>

      <form onSubmit={createOrder}>

        <input
          name="customer_id"
          placeholder="Customer ID"
          onChange={handleChange}
        />

        <input
          name="product_id"
          placeholder="Product ID"
          onChange={handleChange}
        />

        <input
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
        />

        <button type="submit">
          Create Order
        </button>

      </form>

      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Total Amount</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_id}</td>
              <td>{order.product_id}</td>
              <td>{order.quantity}</td>
              <td>{order.total_amount}</td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default Orders;