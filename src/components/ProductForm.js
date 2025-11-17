import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product ? product.image : null);
  const [price, setPrice] = useState(product ? product.price : '');
  const [discountedPrice, setDiscountedPrice] = useState(product ? product.discountedPrice : '');

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !imagePreview || !price) {
      alert('Please fill all required fields!');
      return;
    }

    const productData = {
      id: product ? product.id : Date.now(),
      name,
      description,
      image: imagePreview,
      price: parseFloat(price),
      discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
    };

    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h4>{product ? 'Edit Product' : 'Add New Product'}</h4>
      <div className="mb-3">
        <label>Name *</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Description *</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          required
        />
      </div>
      <div className="mb-3">
        <label>Upload Image *</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
          required={!imagePreview}
        />
      </div>
      {imagePreview && (
        <div className="mb-3">
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="mb-3">
        <label>Price ($) *</label>
        <input
          type="number"
          className="form-control"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Discounted Price ($)</label>
        <input
          type="number"
          className="form-control"
          min="0"
          step="0.01"
          value={discountedPrice || ''}
          onChange={(e) => setDiscountedPrice(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success me-2">
        {product ? 'Save Changes' : 'Add Product'}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ProductForm;