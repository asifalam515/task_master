import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState(false); // Default status is incomplete
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://task-master-drf.onrender.com/category/category/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://task-master-drf.onrender.com/tasks/create/',
        {
          title: title,
          description: description,
          due_date: date, // Assuming the API expects 'due_date' instead of 'date'
          priority: priority,
          status: status,
          category: category
        }
      );
      console.log(response.data); // Assuming the response contains the newly created task data
      setSuccessMessage('Task created successfully.');
      setErrorMessage('');
      setTitle('');
      setDescription('');
      setDate('');
      setPriority('');
      setStatus(false); // Reset status to incomplete
      setCategory('');
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage('Failed to create task. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='container'>
      <h2>Create Task</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Due Date:</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="priority">
          <Form.Label>Priority:</Form.Label>
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Check
            type="checkbox"
            label="Status (Mark as completed)"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </div>
  );
}

export default CreateTask;
