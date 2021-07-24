import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import api from "../api/api.article";
import UpdateArticle from "./UpdateArticle";
import { OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";

export type ArticleProps = {
  isLoggedIn: boolean;
};

const Article = (props: ArticleProps) => {
  let regex = /\[|]|"/g;
  let slug: any = useParams();
  slug = JSON.stringify(Object.values(slug));
  slug = slug.replace(regex, "");

  let history = useHistory();

  const [{ title, description, body }, setArticle] = useState({
    title: "",
    description: "",
    body: "",
  });
  const [error, setError] = useState("");
  const [delError, setDelError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function getArticle() {
      const { article, error } = await api.getArticleBySlug(slug);
      if (isMounted) {
        setArticle({
          title: article.title,
          description: article.description,
          body: article.body,
        });
      }
      if (error) {
        setError(error);
      }
    }
    getArticle();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await api.deleteArticle(slug);
    if (error) {
      setDelError(error);
    } else {
      setIsSuccessful(true);
      setTimeout(() => {
        history.push("/");
      }, 1500);
    }
  };

  const privateVar = (
    <div className="icon-container">
      <OverlayTrigger
        key={"top"}
        placement={"top"}
        overlay={<Tooltip id={"tooltip-top"}>Edit article</Tooltip>}
      >
        <PencilSquare
          size={30}
          className="m-2 article-icon"
          onClick={() => setIsEdit(true)}
        />
      </OverlayTrigger>
      <OverlayTrigger
        key={"top2"}
        placement={"top"}
        overlay={<Tooltip id={"tooltip-top2"}>Delete article</Tooltip>}
      >
        <TrashFill
          size={30}
          className="m-2 article-icon"
          onClick={handleDelete}
        />
      </OverlayTrigger>
    </div>
  );
  if (isEdit) {
    return (
      <UpdateArticle
        title={title}
        description={description}
        body={body}
        tagList={[""]}
        slug={slug}
      />
    );
  } else {
    return (
      <div>
        {error.length > 0 && (
          <Alert variant={"danger"}>
            <Alert.Heading>Error:</Alert.Heading>
            <p>{error.replace(regex, "")}</p>
          </Alert>
        )}
        {delError.length > 0 && (
          <Alert variant={"danger"}>
            <Alert.Heading>Error:</Alert.Heading>
            <p>{delError.replace(regex, "")}</p>
          </Alert>
        )}
        {isSuccessful && (
          <Alert variant={"success"}>
            <Alert.Heading>Success:</Alert.Heading>
            <p>You successfully deleted the article!</p>
          </Alert>
        )}
        <div className="article-wrapper">
          {props.isLoggedIn && privateVar}
          <h1 className="article-title">{title}</h1>
          <h3 className="article-desc">{description}</h3>
          <p className="article-body">{body}</p>
        </div>
      </div>
    );
  }
};

export default Article;
