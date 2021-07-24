import React, { useState } from "react";
import { useHistory } from "react-router";
import api from "../api/api.article";
import { Form, Button, Alert } from "react-bootstrap";

const CreateArticle = () => {
  let history = useHistory();
  let regex = /\[|]|"/g;
  const [{ title, description, body, tagList }, setArticleData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [""],
  });
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { article, error } = await api.createArticle({
      title,
      description,
      body,
      tagList,
    });
    if (error) {
      setError(error);
      setIsSuccessful(false);
    } else if (article) {
      setIsSuccessful(true);
      setTimeout(() => {
        history.push(`/article/${article.slug}`);
      }, 1500);
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
          <p>You successfully created an article!</p>
        </Alert>
      )}
      <div className="box">
        <Form onSubmit={handleSubmit} className="m-auto form-container-article">
          <h2 className="form-title">Create an Article</h2>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Title</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter a title"
              value={title}
              name="title"
              required
              onChange={(e) =>
                setArticleData({
                  title: e.target.value,
                  description,
                  body,
                  tagList,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Description</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              placeholder="A short description"
              value={description}
              name="description"
              required
              onChange={(e) =>
                setArticleData({
                  title,
                  description: e.target.value,
                  body,
                  tagList,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Article Body</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              placeholder="Type your article here"
              value={body}
              name="body"
              required
              onChange={(e) =>
                setArticleData({
                  title,
                  description,
                  body: e.target.value,
                  tagList,
                })
              }
              style={{ height: "200px" }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" size="lg">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateArticle;
