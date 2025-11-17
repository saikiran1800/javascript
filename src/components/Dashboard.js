import React, { useState } from "react";
import { Modal, Table, Badge, ListGroup, Card, Button } from "react-bootstrap";

const Dashboard = ({ data, products = [], orders = [] }) => {
  // Provide default values to prevent undefined errors
  const { 
    totalEarnings = "0", 
    totalOrders = 0, 
    totalItems = 0, 
    currentOrders = 0 
  } = data || {};

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (stat) => {
    setModalContent(stat);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  // Calculate real data from props with safe default values
  const earningsData = (orders || [])
    .filter(order => order.status === 'Completed')
    .map(order => ({
      date: order.timestamp?.split(' ')[0] || '2024-01-01',
      orderId: order.orderNumber || '#ORD-000',
      amount: `₹${order.total || 0}`,
      type: "Online"
    }));

  const ordersData = (orders || []).map(order => ({
    id: order.orderNumber || '#ORD-000',
    customer: order.customerName || 'Unknown Customer',
    status: order.status || 'Pending',
    amount: `₹${order.total || 0}`
  }));

  const menuItemsData = (products || []).map(product => ({
    id: product.id,
    name: product.productName || 'Unknown Item',
    category: product.category || 'Uncategorized',
    price: `₹${product.price || 0}`,
    status: product.available ? 'Available' : 'Out of Stock'
  }));

  const currentOrdersData = (orders || [])
    .filter(order => ['Pending', 'Preparing', 'Ready'].includes(order.status))
    .map(order => ({
      id: order.orderNumber || '#ORD-000',
      items: order.items?.map(item => `${item.name} x${item.quantity}`).join(', ') || 'No items',
      time: "15 mins",
      status: order.status || 'Pending'
    }));

  const statsConfig = [
    { 
      label: "Total Earnings", 
      value: `₹${totalEarnings}`,
      bgColor: "success",
      textColor: "white",
      icon: "💰",
      labelStyle: "fw-bold text-white bg-success bg-opacity-75 px-2 py-1 rounded",
      data: earningsData,
      type: "earnings"
    },
    { 
      label: "Total Orders", 
      value: totalOrders,
      bgColor: "primary",
      textColor: "white",
      icon: "📦",
      labelStyle: "fw-bold text-white bg-primary bg-opacity-75 px-2 py-1 rounded",
      data: ordersData,
      type: "orders"
    },
    { 
      label: "Total Items", 
      value: totalItems,
      bgColor: "warning",
      textColor: "dark",
      icon: "🍕",
      labelStyle: "fw-bold text-dark bg-warning bg-opacity-75 px-2 py-1 rounded",
      data: menuItemsData,
      type: "items"
    },
    { 
      label: "Current Orders", 
      value: currentOrders,
      bgColor: "info",
      textColor: "white",
      icon: "⏳",
      labelStyle: "fw-bold text-white bg-info bg-opacity-75 px-2 py-1 rounded",
      data: currentOrdersData,
      type: "current-orders"
    }
  ];

  const renderModalContent = () => {
    if (!modalContent) return null;

    switch (modalContent.type) {
      case "earnings":
        return (
          <>
            <Modal.Header closeButton className="bg-success text-white">
              <Modal.Title>💰 Earnings Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="mb-3">Recent Transactions (Total: ₹{totalEarnings})</h6>
              {modalContent.data && modalContent.data.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Amount</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalContent.data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.orderId}</td>
                        <td className="fw-bold text-success">{item.amount}</td>
                        <td>
                          <Badge bg={item.type === 'Online' ? 'primary' : 'secondary'}>
                            {item.type}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted py-4">
                  <h5>No earnings data yet</h5>
                  <p>Complete some orders to see earnings here</p>
                </div>
              )}
            </Modal.Body>
          </>
        );

      case "orders":
        return (
          <>
            <Modal.Header closeButton className="bg-primary text-white">
              <Modal.Title>📦 Orders History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="mb-3">All Orders (Total: {totalOrders})</h6>
              {modalContent.data && modalContent.data.length > 0 ? (
                <ListGroup variant="flush">
                  {modalContent.data.map((order, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{order.id}</strong>
                        <br />
                        <small className="text-muted">{order.customer}</small>
                      </div>
                      <div className="text-end">
                        <Badge bg={
                          order.status === 'Completed' ? 'success' :
                          order.status === 'Preparing' ? 'warning' : 
                          order.status === 'Ready' ? 'info' : 'secondary'
                        }>
                          {order.status}
                        </Badge>
                        <br />
                        <strong>{order.amount}</strong>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center text-muted py-4">
                  <h5>No orders yet</h5>
                  <p>Create some orders to see them here</p>
                </div>
              )}
            </Modal.Body>
          </>
        );

      case "items":
        return (
          <>
            <Modal.Header closeButton className="bg-warning text-dark">
              <Modal.Title>🍕 Menu Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="mb-3">Available Menu Items (Total: {totalItems})</h6>
              {modalContent.data && modalContent.data.length > 0 ? (
                <div className="row">
                  {modalContent.data.map((item, index) => (
                    <div key={item.id || index} className="col-md-6 mb-3">
                      <Card className="h-100 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="card-title text-primary">{item.name}</h6>
                              <Badge bg="secondary" className="me-2">{item.category}</Badge>
                              <Badge bg={
                                item.status === 'Available' ? 'success' : 'danger'
                              }>
                                {item.status}
                              </Badge>
                            </div>
                            <h5 className="text-success mb-0">{item.price}</h5>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <h5>No menu items yet</h5>
                  <p>Add some products to see them here</p>
                </div>
              )}
            </Modal.Body>
          </>
        );

      case "current-orders":
        return (
          <>
            <Modal.Header closeButton className="bg-info text-white">
              <Modal.Title>⏳ Current Orders</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="mb-3">Active Orders in Kitchen (Total: {currentOrders})</h6>
              {modalContent.data && modalContent.data.length > 0 ? (
                <ListGroup variant="flush">
                  {modalContent.data.map((order, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{order.id}</strong>
                          <br />
                          <small className="text-muted">{order.items}</small>
                        </div>
                        <div className="text-end">
                          <Badge bg={
                            order.status === 'Ready' ? 'success' :
                            order.status === 'Preparing' ? 'warning' : 'info'
                          }>
                            {order.status}
                          </Badge>
                          <br />
                          <small className="text-muted">{order.time}</small>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center text-muted py-4">
                  <h5>No active orders</h5>
                  <p>All orders are completed or no orders created yet</p>
                </div>
              )}
            </Modal.Body>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12">
            <h2>📊 Restaurant Dashboard</h2>
            <p className="text-muted">Real-time overview of your restaurant performance</p>
          </div>
        </div>

        <div className="row g-4">
          {statsConfig.map((stat) => (
            <div className="col-xl-3 col-md-6" key={stat.label}>
              <div 
                className={`card shadow-lg border-0 h-100 bg-${stat.bgColor} text-${stat.textColor} clickable-card`}
                onClick={() => handleCardClick(stat)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="card-body text-center p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-1">{stat.icon}</span>
                    <span className={`badge ${stat.labelStyle} fs-6`}>
                      {stat.label}
                    </span>
                  </div>
                  <h2 className="card-text fw-bold display-6 mb-0">{stat.value}</h2>
                  <div className="mt-3">
                    <small className="opacity-75">Click for details</small>
                  </div>
                </div>
                <div className={`card-footer bg-${stat.bgColor} bg-opacity-50 border-0 text-center py-2`}>
                  <small className={`text-${stat.textColor} opacity-75`}>
                    View Details →
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Summary */}
        <div className="row mt-5">
          <div className="col-12">
            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">📈 Real-time Statistics</h5>
              </Card.Header>
              <Card.Body>
                <div className="row text-center">
                  <div className="col-md-3">
                    <h4 className="text-success">₹{totalEarnings}</h4>
                    <p className="text-muted mb-0">Total Revenue</p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-primary">{totalOrders}</h4>
                    <p className="text-muted mb-0">Orders Processed</p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-warning">{totalItems}</h4>
                    <p className="text-muted mb-0">Menu Items</p>
                  </div>
                  <div className="col-md-3">
                    <h4 className="text-info">{currentOrders}</h4>
                    <p className="text-muted mb-0">Active Orders</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal for displaying details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        {renderModalContent()}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            Export Data
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;