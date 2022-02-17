// import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

type CardProps = {
  title: string;
  description: string;
  body: string;
  slug: string;
  isDisabled: boolean;
};

export default function ArticleCard(props: CardProps) {
  return (
    <Card border="dark" className="card mb-4">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.description}
        </Card.Subtitle>
        <Card.Text>{props.body}</Card.Text>
        {!props.isDisabled && (
          <Link to={`/article/${props.slug}`} className="card-link">
            <p>Read the whole Article </p>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}
