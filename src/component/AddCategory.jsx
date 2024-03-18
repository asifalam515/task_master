import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://task-master-drf.onrender.com/category/category/',
        { name: categoryName }
      );
      console.log(response.data); // Assuming the response contains the newly created category data
      setSuccessMessage('Category added successfully.');
      setErrorMessage('');
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('Failed to add category. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='container'>
      <h2>Add Category</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="categoryName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddCategory;
