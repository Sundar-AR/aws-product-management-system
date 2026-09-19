import { useState, useEffect } from "react";
import api from "../services/api";

function ProductForm({ selectedProduct, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
      });
    }
  }, [selectedProduct]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedProduct) {
        await api.put(
          `/products/${selectedProduct.id}/`,
          formData
        );
      } else {
        await api.post("/products/", formData);
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });

      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div>
      <h2>
        {selectedProduct ? "Update Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {selectedProduct ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;