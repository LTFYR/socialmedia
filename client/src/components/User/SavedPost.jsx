import React, { useEffect, useState } from "react";
import { GLOBALACTIONS } from "../../redux/actions/global";
import { getData } from "../../utils/fetch";
import PostPage from "../home/post/PostPage";

const SavedPost = ({ auth, dispatch }) => {
  const [userPosts, setuserPosts] = useState([]);
  const [result, setResult] = useState(9);

  useEffect(() => {
    getData("savedposts", auth.token)
      .then((res) => {
        setuserPosts(res.data.savedPosts);
        setResult(res.data.result);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALACTIONS.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      });
  }, []);

  return <PostPage result={result} userPosts={userPosts} />;
};

export default SavedPost;
