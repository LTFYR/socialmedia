import {
  faDotCircle,
  faEdit,
  faExpand,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";

const CommentEdit = ({ setEdit, post, comment }) => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment }));
    }
  };

  return (
    <>
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            ...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                <>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => setEdit(true)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2 " onClick={handleRemove}>
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item onClick={handleRemove}>
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </Dropdown.Item>
              )
            ) : (
              comment.user._id === auth.user._id && (
                <>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => setEdit(true)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2 " onClick={handleRemove}>
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </Dropdown.Item>
                </>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default CommentEdit;
