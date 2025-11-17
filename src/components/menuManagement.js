import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Card, Badge } from 'react-bootstrap';

const MenuManagement = ({ products, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Biryani',
    price: '',
    description: '',
    available: true
  });

  const handleShowModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        productName: '',
        category: 'Biryani',
        price: '',
        description: '',
        available: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop&crop=center"
      };
      setProducts([...products, newProduct]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleToggleAvailability = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    ));
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>📋 Menu Management</h2>
              <p className="text-muted">Manage your restaurant menu items ({products.length} items)</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => handleShowModal()}
            >
              ➕ Add New Item
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-xl-4 col-lg-6 col-md-6">
            <div className={`card h-100 shadow-sm ${!product.available ? 'opacity-50' : ''}`}>
              <div className="row g-0 h-100">
                <div className="col-5">
                  <img 
                    src={product.image} 
                    alt={product.productName}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-7">
                  <div className="card-body d-flex flex-column h-100">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title fw-bold text-primary mb-0">
                          {product.productName}
                        </h6>
                        <span className={`badge ${
                          product.category === 'Biryani' ? 'bg-primary' : 
                          product.category === 'Starter' ? 'bg-success' : 
                          'bg-warning'
                        }`}>
                          {product.category}
                        </span>
                      </div>
                      <p className="card-text small text-muted mb-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <h5 className="text-success mb-0">₹{product.price}</h5>
                      <span className={`badge ${product.available ? 'bg-success' : 'bg-danger'}`}>
                        {product.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-warning btn-sm flex-fill"
                        onClick={() => handleShowModal(product)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-info btn-sm flex-fill"
                        onClick={() => handleToggleAvailability(product.id)}
                      >
                        {product.available ? '❌ Hide' : '✅ Show'}
                      </button>
                      <button
                        className="btn btn-danger btn-sm flex-fill"
                        onClick={() => handleDelete(product.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <Alert variant="info" className="text-center mt-4">
          <h5>No menu items found!</h5>
          <p>Click "Add New Item" to create your first menu item.</p>
        </Alert>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? 'Edit Menu Item' : 'Add New Menu Item'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Biryani">Biryani</option>
                    <option value="Starter">Starter</option>
                    <option value="Mandi">Mandi</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="available"
              label="Available for ordering"
              checked={formData.available}
              onChange={handleInputChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? 'Update Item' : 'Add Item'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuManagement;