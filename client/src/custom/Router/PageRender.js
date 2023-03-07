import React from "react";
import { redirect, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import { useSelector, useDispatch } from "react-redux";

const generatePage = (pageName) => {
  const component = () => require(`../../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  let name = "";
  if (auth.token) {
    if (id) {
      name = `${page}/[id]`;
    } else {
      name = `${page}`;
    }
  }
  return generatePage(name);
};

export default PageRender;
