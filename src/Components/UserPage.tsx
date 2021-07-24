import React, { useState, useEffect } from "react";
import api from "../api/api.user";
import { Container, Row, Col, Alert } from "react-bootstrap";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import peopleImg from "../img/people.jpg";
// Image created by pch.vector - www.freepik.com

const UserPage = () => {
  const token = sessionStorage.getItem("token");
  let regex = /\[|]|"/g;
  const [user, setUser] = useState({
    id: 0,
    email: "",
    token: "",
    username: "",
    bio: "",
    image: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      if (token) {
        const { userData, error } = await api.getUser(token);
        if (error) {
          setError(error);
        } else if (userData) {
          setUser(userData);
        }
      }
    }
    getData();
  }, [token]);

  return (
    <div>
      {error.length > 0 && (
        <Alert variant={"danger"}>
          <Alert.Heading>Error:</Alert.Heading>
          <p>{error.replace(regex, "")}</p>
        </Alert>
      )}
      <div className="text-container">
        <Row>
          <h1 className="text-dark title my-4">
            Welcome <span className="text-primary">{user.username}</span>! :)
          </h1>
        </Row>
        <Row>
          <Col xs={7}>
            <ul>
              <h2 className="text-dark list-title my-3">Your User Data:</h2>
              <li className="text-dark list-item pt-3">
                Email: <span className="text-primary"> {user.email} </span>
              </li>
              <li className="text-dark list-item pt-3">
                Username:
                <span className="text-primary"> {user.username} </span>
              </li>
              <li className="text-dark list-item pt-3">
                About you: <span className="text-primary"> {user.bio} </span>
              </li>
            </ul>
          </Col>
          <Col className="align-right">
            <UpdateUser />
          </Col>
        </Row>
      </div>
      <Container>
        <Row>
          <img
            src={peopleImg}
            alt="People greeting each other"
            id="people-img"
          />
        </Row>
      </Container>
      <div className="text-container">
        <Row>
          <DeleteUser />
        </Row>
      </div>
    </div>
  );
};

export default UserPage;
