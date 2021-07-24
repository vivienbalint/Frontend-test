import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import api from "../api/api.user";
import AuthContext from "../auth/auth.context";
import { useHistory } from "react-router";

const Login = () => {
  let history = useHistory();
  let regex = /\[|]|"/g;

  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { dispatch } = React.useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await api.loginUser({ email, password });
    if (error) {
      setError(error);
      dispatch({ type: "LOGOUT" });
    } else if (user) {
      const userDataResponse = {
        user,
        token: user.token,
      };
      history.push("/user-page");

      dispatch({ type: "LOGIN", payload: userDataResponse });
    }
  };

  return (
    <div className="box">
      {error.length > 0 && (
        <Alert variant={"danger"}>
          <Alert.Heading>Error:</Alert.Heading>
          <p>{error.replace(regex, "")}</p>
        </Alert>
      )}
      <Form onSubmit={handleLogin} className="mx-auto form-container">
        <h2 className="form-title">Login</h2>
        <Form.Group className="mb-3">
          <Form.Label column="lg">Email address</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) =>
              setCredentials({
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
            autoComplete="true"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setCredentials({
                email,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
