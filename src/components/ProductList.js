import React, { useState } from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMin = minPrice ? p.price >= parseFloat(minPrice) : true;
    const matchesMax = maxPrice ? p.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="form-control"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="form-control"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price ($)</th>
            <th>Discounted Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length ? (
            filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>{p.discountedPrice ? p.discountedPrice.toFixed(2) : '-'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ProductList;