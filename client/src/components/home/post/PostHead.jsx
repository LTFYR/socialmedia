import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../../style/post.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import {
  faCopy,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { GLOBALACTIONS } from "../../../redux/actions/global";

const PostHead = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleUpdatePost = () => {
    dispatch({
      type: GLOBALACTIONS.STATUS,
      payload: { ...post, onEdit: true },
    });
  };
  return (
    <div className="post_header">
      <img src={post.user.avatar} alt="" />
      <div className="post-name">
        <div className="user-detail">
          <h6>
            <Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            ...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {auth.user._id === post.user._id && (
              <>
                <Dropdown.Item onClick={handleUpdatePost}>
                  <FontAwesomeIcon icon={faEdit} />
                  Edit post
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <FontAwesomeIcon icon={faTrashCan} />
                  Delete post
                </Dropdown.Item>
              </>
            )}
            <Dropdown.Item>
              <FontAwesomeIcon icon={faCopy} />
              Copy
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default PostHead;
