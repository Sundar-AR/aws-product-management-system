import { useEffect, useState } from "react";
import api from "../services/api";
import "./ProductList.css";

function ProductList({ onEdit, refresh }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products/");

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/products/${id}/`);

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const getStatus = (quantity) => {
    if (quantity === 0) {
      return {
        text: "Out of Stock",
        className: "status-out",
      };
    }

    if (quantity <= 5) {
      return {
        text: "Low Stock",
        className: "status-low",
      };
    }

    return {
      text: "In Stock",
      className: "status-in",
    };
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-message">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <div>
          <h2>Products</h2>
          <p>Manage your product inventory</p>
        </div>
      </div>

      {/* Search and filter */}
      <div className="products-toolbar">
        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="filter-btn">
          ☰ Filter
        </button>
      </div>

      {/* Product table */}
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const status = getStatus(product.quantity);

                return (
                  <tr key={product.id}>
                    {/* Product */}
                    <td>
                      <div className="product-info">
                        <div className="product-image-container">
                          {product.image ? (
                            <img
                              src={
                                product.image.startsWith("http")
                                  ? product.image
                                  : `http://127.0.0.1:8000${product.image}`
                              }
                              alt={product.name}
                              className="product-image"
                            />
                          ) : (
                            <div className="product-image-placeholder">
                              📦
                            </div>
                          )}
                        </div>

                        <div className="product-details">
                          <strong>{product.name}</strong>

                          <span>
                            {product.description
                              ? product.description
                              : "No description"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="product-price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td>
                      <span className="product-quantity">
                        {product.quantity}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${status.className}`}
                      >
                        {status.text}
                      </span>
                    </td>

                    {/* Updated */}
                    <td>
                      <span className="updated-date">
                        {product.updated_at
                          ? new Date(
                              product.updated_at
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => onEdit(product)}
                          title="Edit product"
                        >
                          ✏️
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          title="Delete product"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Product count */}
      <div className="products-footer">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}

export default ProductList;