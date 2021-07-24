import React, { useState } from "react";
import api from "../api/api.user";
import AuthContext from "../auth/auth.context";
import { useHistory } from "react-router";
import { Form, Button, Alert, FloatingLabel, Row, Col } from "react-bootstrap";

const UpdateUser = () => {
  let token = sessionStorage.getItem("token") ?? "";

  let regex = /\[|]|"/g;
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = React.useContext(AuthContext);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      token,
      email,
    };
    const { userData, error } = await api.updateUser(data);
    if (error) {
      setError(error);
    } else if (userData) {
      const userDataResponse = {
        user: userData,
        token,
      };
      dispatch({ type: "UPDATE_PROFILE", payload: userDataResponse });
      history.push("/");
      history.push("/user-page");
    }
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      token,
      username,
    };
    const { userData, error } = await api.updateUser(data);
    if (error) {
      setError(error);
    } else if (userData) {
      const userDataResponse = {
        user: userData,
        token,
      };
      dispatch({ type: "UPDATE_PROFILE", payload: userDataResponse });
      history.push("/");
      history.push("/user-page");
    }
  };

  const handleBioUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      token,
      bio,
    };
    const { userData, error } = await api.updateUser(data);
    if (error) {
      setError(error);
    } else if (userData) {
      const userDataResponse = {
        user: userData,
        token,
      };
      dispatch({ type: "UPDATE_PROFILE", payload: userDataResponse });
      history.push("/");
      history.push("/user-page");
    }
  };

  return (
    <div>
      {error.length > 0 && (
        <Alert variant={"danger"}>
          <Alert.Heading>Error:</Alert.Heading>
          <p>{error.replace(regex, "")}</p>
        </Alert>
      )}
      <h2 className="text-dark list-title my-3">Update Your User Data:</h2>
      <Form onSubmit={handleEmailUpdate} className="m-auto">
        <Row className="align-items-center">
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Enter new email address">
                <Form.Control
                  size="sm"
                  type="email"
                  aria-describedby="addon-btn1"
                  placeholder="Enter new email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" className="mb-3">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      <Form onSubmit={handleUsernameUpdate} className="m-auto">
        <Row className="align-items-center">
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Enter new username">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter new username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" className="mb-3">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
      <Form onSubmit={handleBioUpdate} className="m-auto">
        <Row className="align-items-center">
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Tell us something about yourself...">
                <Form.Control
                  as="textarea"
                  size="sm"
                  placeholder="Tell us something about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" className="mb-3">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default UpdateUser;
