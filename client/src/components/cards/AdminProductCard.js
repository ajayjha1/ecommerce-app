import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import laptop from '../../images/laptop.jpg';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const AdminProductCard = ({ product, handleRemove }) => {
  const { name, title, images, description, quantity, price, slug } = product;

  const navigate = useNavigate()

  const navigateToEditPage = (slug) =>{
    navigate(`/admin/product/${slug}`)
  }

  return (
    <Col md={4} style={{ marginBottom: '1rem' }}>
      <Card>
        <Card.Img
          style={{ height: '170px', objectFit: 'cover' }}
          variant="top"
          src={images && images.length ? images[0].url : laptop}
          alt={name}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description.substring(0,15)+ '...'}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span className="price">₹{price}</span>
            <span className="quantity">{quantity} in stock</span>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button onClick={()=>navigateToEditPage(slug)} variant="primary" className="mr-2">
              <FaEdit />
            </Button>
            <Button onClick={() => handleRemove(slug)} variant="danger">
              <FaTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
