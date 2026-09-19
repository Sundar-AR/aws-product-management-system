import { useEffect, useState } from "react";
import api from "../services/api";

function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}/`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No products yet</h3>
        <p>Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <section className="products-section">

      <div className="products-header">
        <h2>All Products</h2>
        <span className="product-count">
          {products.length} Products
        </span>
      </div>

      <div className="product-grid">

        {products.map((product) => (

          <div className="product-card" key={product.id}>

            <div className="product-image">

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                />
              ) : (
                <span>📦</span>
              )}

            </div>

            <div className="product-info">

              <h3>{product.name}</h3>

              <p className="description">
                {product.description || "No description available"}
              </p>

              <div className="product-details">

                <span className="price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                <span
                  className={
                    product.quantity > 0
                      ? "stock available"
                      : "stock out"
                  }
                >
                  {product.quantity > 0
                    ? `Stock: ${product.quantity}`
                    : "Out of stock"}
                </span>

              </div>

              <div className="card-actions">

                <button
                  className="edit-button"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default ProductList;