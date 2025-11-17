import React from "react";
import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          Restaurant Dashboard
        </Link>
        <div>
          <Link className="btn btn-outline-primary me-2" to="/dashboard">
            Dashboard
          </Link>
          <Link className="btn btn-outline-primary me-2" to="/products">
            Products
          </Link>
          {/* <Link className="btn btn-outline-info me-2" to="/products">
            Products
          </Link> */}
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
