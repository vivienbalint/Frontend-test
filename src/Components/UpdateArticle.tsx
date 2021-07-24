import React, { useState } from "react";
import { useHistory } from "react-router";
import api from "../api/api.article";
import { Form, Button, Alert } from "react-bootstrap";

export type UpdateArticleProps = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug: string;
};

const UpdateArticle = (props: UpdateArticleProps) => {
  let history = useHistory();
  let regex = /\[|]|"/g;

  const [{ title, description, body, tagList, slug }, setArticle] = useState({
    title: props.title,
    description: props.description,
    body: props.body,
    tagList: props.tagList,
    slug: props.slug,
  });
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleArticleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const article = {
      title,
      description,
      body,
      tagList,
      slug,
    };
    const { error } = await api.updateArticleBySlug(article);
    if (error) {
      setError(error);
      setIsSuccessful(false);
    } else {
      setIsSuccessful(true);
      setTimeout(() => {
        history.push("/");
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
          <p>You successfully updated the article!</p>
        </Alert>
      )}
      <div className="box">
        <Form
          onSubmit={handleArticleUpdate}
          className="m-auto form-container-article"
        >
          <h2 className="form-title">Edit Article</h2>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Title</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder={title}
              value={title}
              name="title"
              required
              onChange={(e) =>
                setArticle({
                  title: e.target.value,
                  description,
                  body,
                  tagList,
                  slug,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column="lg">Description</Form.Label>
            <Form.Control
              size="lg"
              as="textarea"
              placeholder={description}
              value={description}
              name="description"
              required
              onChange={(e) =>
                setArticle({
                  title,
                  description: e.target.value,
                  body,
                  tagList,
                  slug,
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
                setArticle({
                  title,
                  description,
                  body: e.target.value,
                  tagList,
                  slug,
                })
              }
              style={{ height: "200px" }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" size="lg">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateArticle;
