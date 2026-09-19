import { useState } from "react";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setSelectedProduct(null);
    setShowForm(false);
    setRefresh(!refresh);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  return (
    <div className="app">

      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <h2>ProductHub</h2>
            <span>Management Dashboard</span>
          </div>
        </div>

        <button className="add-button" onClick={handleAdd}>
          + Add Product
        </button>
      </header>

      <main className="main-content">

        <section className="page-header">
          <div>
            <h1>Products</h1>
            <p>Manage your product inventory</p>
          </div>
        </section>

        {showForm && (
          <ProductForm
            selectedProduct={selectedProduct}
            onSuccess={handleSuccess}
          />
        )}

        <ProductList
          key={refresh}
          onEdit={handleEdit}
        />

      </main>

    </div>
  );
}

export default App;