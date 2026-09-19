import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">P</div>
          <span>Productly</span>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>▤</span>
            Products
          </button>

          <button className="nav-item">
            <span>◫</span>
            Orders
          </button>

          <button className="nav-item">
            <span>♙</span>
            Customers
          </button>

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-profile">
            <div className="avatar">SA</div>

            <div>
              <strong>Sundar A R</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your product overview.</p>
          </div>

          <button
            className="add-product-btn"
            onClick={handleAddProduct}
          >
            <span>+</span>
            Add Product
          </button>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">▦</div>

            <div>
              <span>Total Products</span>
              <strong>24</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>

            <div>
              <span>In Stock</span>
              <strong>20</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">!</div>

            <div>
              <span>Low Stock</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">₹</div>

            <div>
              <span>Total Value</span>
              <strong>₹8.4L</strong>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="products-section">
          <ProductList
            onEdit={handleEditProduct}
            refresh={refresh}
          />
        </section>
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;