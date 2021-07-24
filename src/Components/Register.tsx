import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../auth/auth.context";
import api from "../api/api.user";
import { Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  let history = useHistory();
  let regex = /\[|]|"/g;
  const { dispatch } = React.useContext(AuthContext);

  const [{ username, email, password }, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await api.createUser({
      username,
      email,
      password,
    });
    if (error) {
      setError(error);
      setIsSuccessful(false);
    } else if (user) {
      const userDataResponse = {
        userData: {
          email: user.email,
          username: user.username,
        },
        token: user.token,
      };
      setIsSuccessful(true);
      history.push("/user-page");
      dispatch({ type: "LOGIN", payload: userDataResponse });
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
      {isSuccessful && (
        <Alert variant={"success"}>
          <Alert.Heading>Success:</Alert.Heading>
          <p>You successfully registered yourself!</p>
        </Alert>
      )}
      <div className="box">
        <Form onSubmit={handleRegister} className="m-auto form-container">
          <h2 className="form-title">Register</h2>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Username</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setRegisterData({
                  username: e.target.value,
                  email,
                  password,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Email address</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) =>
                setRegisterData({
                  username,
                  email: e.target.value,
                  password,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              placeholder="Password"
              autoComplete="true"
              value={password}
              onChange={(e) =>
                setRegisterData({
                  username,
                  email,
                  password: e.target.value,
                })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit" size="lg">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
