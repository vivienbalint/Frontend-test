import React, { useState } from "react";
import api from "../api/api.user";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";

const DeleteUser = () => {
  let regex = /\[|]|"/g;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await api.deleteUser(email);
    if (error) {
      setError(error);
    } else {
      setIsSuccessful(true);
    }
  };

  let message;

  if (error.length > 0) {
    message = (
      <Form.Text id="message-block" className="error-message">
        {error.replace(regex, "")}
      </Form.Text>
    );
  } else if (isSuccessful) {
    message = (
      <Form.Text id="success-block" className="success-message">
        You successfully deleted the user.
      </Form.Text>
    );
  }

  return (
    <div>
      <Form onSubmit={handleDelete} className="m-auto">
        <Row className="align-items-center">
          <Col xs={7}>
            <p className="text-dark sub-form-title mb-5">
              Delete user by email:
            </p>
          </Col>
          <Col>
            <Form.Group className="mb-5">
              <FloatingLabel label="Enter email">
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Enter email"
                  aria-describedby="message-block success-block"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              {message}
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="dark" type="submit" className="mb-5">
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeleteUser;
