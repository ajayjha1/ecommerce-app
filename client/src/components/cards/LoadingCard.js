import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

export const LoadingCard = () => (
    <Card style={{ width: '18rem' }}>
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </Card>
);
