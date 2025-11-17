import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import MenuManagement from "./components/menuManagement";

function App() {
  const [user, setUser] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 12345,
    totalOrders: 123,
    totalItems: 0,
    currentOrders: 5,
  });

  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save products & update dashboard data when products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    setDashboardData((d) => ({ ...d, totalItems: products.length }));
  }, [products]);

  const openModal = (product = null) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const saveProduct = (product) => {
    const exists = products.find((p) => p.id === product.id);
    if (exists) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setModalOpen(false);
  };

  // Require login to access routes except login page
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/forget" element={<div>Forget Password Page</div>} />
          <Route path="*" element={<Login onLogin={setUser} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar onLogout={() => setUser(null)} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard data={dashboardData} />} />
          <Route
            path="/products"
            element={
              <>
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h3>Products</h3>
                  <button className="btn btn-primary" onClick={() => openModal()}>
                    + Add New Product
                  </button>
                </div>
                <ProductList
                  products={products}
                  onEdit={openModal}
                  onDelete={deleteProduct}
                />
                <Modal
                  show={modalOpen}
                  title={editingProduct ? "Edit Product" : "Add New Product"}
                  onClose={() => setModalOpen(false)}
                >
                  <ProductForm
                    product={editingProduct}
                    onSubmit={saveProduct}
                    onCancel={() => setModalOpen(false)}
                  />
                </Modal>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
