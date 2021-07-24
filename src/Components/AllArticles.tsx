import React, { useState, useEffect } from "react";
import api from "../api/api.article";
import ArticleCard from "./ArticleCard";
import { Alert } from "react-bootstrap";

function AllArticles() {
  let regex = /\[|]|"/g;
  const [articles, setArticles] = useState<any[]>([]);
  const [showArticles, setShowArticles] = useState(false);
  const [error, setError] = useState("");

  const dummyArticles = [
    {
      id: 51516515,
      title: "Title",
      description: "Aenean molestie eu mauris vitae pretium.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam lorem, ornare non tellus a, posuere sodales nisl. Mauris eget neque mollis, dignissim felis sed, rutrum elit. Suspendisse non ipsum nec neque hendrerit efficitur. Nullam accumsan dapibus magna, ut ultricies eros semper eu. Mauris vel molestie mauris, ac luctus ante. In gravida, lectus ut lacinia cursus, nulla ex venenatis mi, rutrum mollis nisl leo in nisi. Nullam sollicitudin interdum ipsum, sit amet lobortis ante iaculis eu. Morbi sed diam fringilla, laoreet augue quis, faucibus massa. Morbi tincidunt ullamcorper justo, non vestibulum tortor rhoncus in. Duis congue lacus posuere congue suscipit. In nec odio nec ex rhoncus rutrum vel a augue. Aliquam erat volutpat. Nulla lobortis, nibh a lobortis venenatis, risus neque eleifend sem, sed feugiat elit augue eu sem. Proin pulvinar placerat venenatis. In posuere luctus est, in consequat diam tincidunt at. Cras risus dui, maximus nec odio et, dapibus blandit dolor. Quisque auctor mattis purus. Mauris feugiat quis mi et convallis. Praesent vitae neque ultricies nisl ultrices sodales. Integer quis arcu elementum, vulputate ex euismod, elementum libero. Aenean gravida rutrum massa. Praesent elit nulla, suscipit bibendum velit eget, tincidunt efficitur lectus. Fusce sollicitudin dapibus lacus sed venenatis. Quisque ullamcorper nisi nec vestibulum rhoncus. Aenean eget arcu elementum, hendrerit ante sit amet, gravida odio. Nulla scelerisque, lectus eu lacinia dapibus, tellus odio mattis purus, in dignissim quam turpis ut libero. Etiam lacinia tempor turpis, id blandit turpis malesuada id. Mauris aliquet molestie placerat. Mauris ut mauris id turpis scelerisque aliquet et sit amet erat. Suspendisse hendrerit sem lectus, sit amet lacinia purus gravida vel. Duis varius, ligula vel cursus dignissim, mauris ligula consectetur mauris, quis posuere neque ex nec ipsum. Aliquam felis elit, congue id elit eget, pharetra venenatis metus. Phasellus vulputate ex et congue pharetra. Integer ac metus tempus, ultricies urna eget, sagittis dolor. Maecenas auctor enim quis orci imperdiet, in euismod lacus luctus. Cras nulla felis, pharetra ut orci id, efficitur volutpat lectus. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed faucibus volutpat blandit.",
      slug: "title-51515",
    },
    {
      id: 51516519,
      title: "Title2",
      description: "Aenean molestie eu mauris vitae pretium.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam lorem, ornare non tellus a, posuere sodales nisl. Mauris eget neque mollis, dignissim felis sed, rutrum elit. Suspendisse non ipsum nec neque hendrerit efficitur. Nullam accumsan dapibus magna, ut ultricies eros semper eu. Mauris vel molestie mauris, ac luctus ante. In gravida, lectus ut lacinia cursus, nulla ex venenatis mi, rutrum mollis nisl leo in nisi. Nullam sollicitudin interdum ipsum, sit amet lobortis ante iaculis eu. Morbi sed diam fringilla, laoreet augue quis, faucibus massa. Morbi tincidunt ullamcorper justo, non vestibulum tortor rhoncus in. Duis congue lacus posuere congue suscipit. In nec odio nec ex rhoncus rutrum vel a augue. Aliquam erat volutpat. Nulla lobortis, nibh a lobortis venenatis, risus neque eleifend sem, sed feugiat elit augue eu sem. Proin pulvinar placerat venenatis. In posuere luctus est, in consequat diam tincidunt at. Cras risus dui, maximus nec odio et, dapibus blandit dolor. Quisque auctor mattis purus. Mauris feugiat quis mi et convallis. Praesent vitae neque ultricies nisl ultrices sodales. Integer quis arcu elementum, vulputate ex euismod, elementum libero. Aenean gravida rutrum massa. Praesent elit nulla, suscipit bibendum velit eget, tincidunt efficitur lectus. Fusce sollicitudin dapibus lacus sed venenatis. Quisque ullamcorper nisi nec vestibulum rhoncus. Aenean eget arcu elementum, hendrerit ante sit amet, gravida odio. Nulla scelerisque, lectus eu lacinia dapibus, tellus odio mattis purus, in dignissim quam turpis ut libero. Etiam lacinia tempor turpis, id blandit turpis malesuada id. Mauris aliquet molestie placerat. Mauris ut mauris id turpis scelerisque aliquet et sit amet erat. Suspendisse hendrerit sem lectus, sit amet lacinia purus gravida vel. Duis varius, ligula vel cursus dignissim, mauris ligula consectetur mauris, quis posuere neque ex nec ipsum. Aliquam felis elit, congue id elit eget, pharetra venenatis metus. Phasellus vulputate ex et congue pharetra. Integer ac metus tempus, ultricies urna eget, sagittis dolor. Maecenas auctor enim quis orci imperdiet, in euismod lacus luctus. Cras nulla felis, pharetra ut orci id, efficitur volutpat lectus. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed faucibus volutpat blandit.",
      slug: "title2-51515",
    },
    {
      id: 51516518,
      title: "Title3",
      description: "Aenean molestie eu mauris vitae pretium.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam lorem, ornare non tellus a, posuere sodales nisl. Mauris eget neque mollis, dignissim felis sed, rutrum elit. Suspendisse non ipsum nec neque hendrerit efficitur. Nullam accumsan dapibus magna, ut ultricies eros semper eu. Mauris vel molestie mauris, ac luctus ante. In gravida, lectus ut lacinia cursus, nulla ex venenatis mi, rutrum mollis nisl leo in nisi. Nullam sollicitudin interdum ipsum, sit amet lobortis ante iaculis eu. Morbi sed diam fringilla, laoreet augue quis, faucibus massa. Morbi tincidunt ullamcorper justo, non vestibulum tortor rhoncus in. Duis congue lacus posuere congue suscipit. In nec odio nec ex rhoncus rutrum vel a augue. Aliquam erat volutpat. Nulla lobortis, nibh a lobortis venenatis, risus neque eleifend sem, sed feugiat elit augue eu sem. Proin pulvinar placerat venenatis. In posuere luctus est, in consequat diam tincidunt at. Cras risus dui, maximus nec odio et, dapibus blandit dolor. Quisque auctor mattis purus. Mauris feugiat quis mi et convallis. Praesent vitae neque ultricies nisl ultrices sodales. Integer quis arcu elementum, vulputate ex euismod, elementum libero. Aenean gravida rutrum massa. Praesent elit nulla, suscipit bibendum velit eget, tincidunt efficitur lectus. Fusce sollicitudin dapibus lacus sed venenatis. Quisque ullamcorper nisi nec vestibulum rhoncus. Aenean eget arcu elementum, hendrerit ante sit amet, gravida odio. Nulla scelerisque, lectus eu lacinia dapibus, tellus odio mattis purus, in dignissim quam turpis ut libero. Etiam lacinia tempor turpis, id blandit turpis malesuada id. Mauris aliquet molestie placerat. Mauris ut mauris id turpis scelerisque aliquet et sit amet erat. Suspendisse hendrerit sem lectus, sit amet lacinia purus gravida vel. Duis varius, ligula vel cursus dignissim, mauris ligula consectetur mauris, quis posuere neque ex nec ipsum. Aliquam felis elit, congue id elit eget, pharetra venenatis metus. Phasellus vulputate ex et congue pharetra. Integer ac metus tempus, ultricies urna eget, sagittis dolor. Maecenas auctor enim quis orci imperdiet, in euismod lacus luctus. Cras nulla felis, pharetra ut orci id, efficitur volutpat lectus. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed faucibus volutpat blandit.",
      slug: "title3-51515",
    },
    {
      id: 51516517,
      title: "Title4",
      description: "Aenean molestie eu mauris vitae pretium.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quam lorem, ornare non tellus a, posuere sodales nisl. Mauris eget neque mollis, dignissim felis sed, rutrum elit. Suspendisse non ipsum nec neque hendrerit efficitur. Nullam accumsan dapibus magna, ut ultricies eros semper eu. Mauris vel molestie mauris, ac luctus ante. In gravida, lectus ut lacinia cursus, nulla ex venenatis mi, rutrum mollis nisl leo in nisi. Nullam sollicitudin interdum ipsum, sit amet lobortis ante iaculis eu. Morbi sed diam fringilla, laoreet augue quis, faucibus massa. Morbi tincidunt ullamcorper justo, non vestibulum tortor rhoncus in. Duis congue lacus posuere congue suscipit. In nec odio nec ex rhoncus rutrum vel a augue. Aliquam erat volutpat. Nulla lobortis, nibh a lobortis venenatis, risus neque eleifend sem, sed feugiat elit augue eu sem. Proin pulvinar placerat venenatis. In posuere luctus est, in consequat diam tincidunt at. Cras risus dui, maximus nec odio et, dapibus blandit dolor. Quisque auctor mattis purus. Mauris feugiat quis mi et convallis. Praesent vitae neque ultricies nisl ultrices sodales. Integer quis arcu elementum, vulputate ex euismod, elementum libero. Aenean gravida rutrum massa. Praesent elit nulla, suscipit bibendum velit eget, tincidunt efficitur lectus. Fusce sollicitudin dapibus lacus sed venenatis. Quisque ullamcorper nisi nec vestibulum rhoncus. Aenean eget arcu elementum, hendrerit ante sit amet, gravida odio. Nulla scelerisque, lectus eu lacinia dapibus, tellus odio mattis purus, in dignissim quam turpis ut libero. Etiam lacinia tempor turpis, id blandit turpis malesuada id. Mauris aliquet molestie placerat. Mauris ut mauris id turpis scelerisque aliquet et sit amet erat. Suspendisse hendrerit sem lectus, sit amet lacinia purus gravida vel. Duis varius, ligula vel cursus dignissim, mauris ligula consectetur mauris, quis posuere neque ex nec ipsum. Aliquam felis elit, congue id elit eget, pharetra venenatis metus. Phasellus vulputate ex et congue pharetra. Integer ac metus tempus, ultricies urna eget, sagittis dolor. Maecenas auctor enim quis orci imperdiet, in euismod lacus luctus. Cras nulla felis, pharetra ut orci id, efficitur volutpat lectus. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed faucibus volutpat blandit.",
      slug: "title4-51515",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    async function getAllArticles() {
      const { articles, error } = await api.getArticles();
      if (isMounted) {
        setArticles(articles);
        if (
          typeof articles !== "undefined" &&
          articles !== null &&
          articles.length !== 0
        ) {
          setShowArticles(true);
        }
      }
      if (error) {
        setError(error);
      }
    }
    getAllArticles();
    return () => {
      isMounted = false;
    };
  }, [articles]);

  const dummy = dummyArticles.map((dummyA) => (
    <ArticleCard
      key={dummyA.id}
      title={dummyA.title}
      description={dummyA.description}
      body={`${dummyA.body.substring(0, 300)}...`}
      slug={dummyA.slug}
      isDisabled={true}
    />
  ));

  if (showArticles) {
    const cards = articles.map((article) => (
      <ArticleCard
        key={article.id}
        title={article.title}
        description={article.description}
        body={`${article.body.substring(0, 300)}...`}
        slug={article.slug}
        isDisabled={false}
      />
    ));
    return (
      <div>
        {error.length > 0 && (
          <Alert variant={"danger"}>
            <Alert.Heading>Error:</Alert.Heading>
            <p>{error.replace(regex, "")}</p>
          </Alert>
        )}
        <div className="all-cards-container">
          {cards} {dummy}
        </div>
      </div>
    );
  } else return <div className="all-cards-container"> {dummy} </div>;
}

export default AllArticles;
