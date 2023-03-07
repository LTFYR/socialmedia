import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALACTIONS } from "../../redux/actions/global";
import { createNewPost, updatePost } from "../../redux/actions/postAction";

const Status = () => {
  const { auth, status, theme } = useSelector((state) => state);
  const [text, setText] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [strm, setStrm] = useState(false);
  const [tracks, setTracks] = useState("");

  const dispatch = useDispatch();

  const ref = useRef();
  const refCanvas = useRef();

  const addImageToPost = (e) => {
    const images = [...e.target.files];
    let error = "";
    let newImages = [];

    images.forEach((image) => {
      if (!image) return (error = "Add image");

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        return (error = "Invalid file format added");
      }

      return newImages.push(image);
    });
    if (error)
      dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { error: error } });
    setPostImages([...postImages, ...newImages]);
  };

  const removeImage = (i) => {
    const arr = [...postImages];
    arr.splice(i, 1);
    setPostImages(arr);
  };

  const handleVideo = () => {
    setStrm(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((v) => {
          ref.current.srcObject = v;
          ref.current.play();
          const track = v.getTracks();
          setTracks(track[0]);
        })
        .catch((error) => console.log(error));
    }
  };

  const captureVideo = () => {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(ref.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setPostImages([...postImages, { camera: URL }]);
  };

  const stopRecording = () => {
    tracks.stop();
    setStrm(false);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (postImages.length === 0)
      return dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: "You must upload at least 1 image" },
      });

    console.log(status.onEdit === true);
    if (status.onEdit) {
      dispatch(updatePost({ text, postImages, auth, status }));
    } else {
      dispatch(createNewPost({ text, postImages, auth }));
    }

    setText("");
    setPostImages([]);

    if (tracks) tracks.stop();
    dispatch({ type: GLOBALACTIONS.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setPostImages(status.postImages);
      setText(status.text);
    }
  }, [status]);

  return (
    <div className="status-modal">
      <form onSubmit={handlePost}>
        <div className="head">
          <h6>Create a Post</h6>
          <span
            className="modal-close"
            onClick={() =>
              dispatch({ type: GLOBALACTIONS.STATUS, payload: false })
            }
          >
            x
          </span>
        </div>
        <div className="body">
          <textarea
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`${auth.user.username}, add your status`}
          />
          <div className="uploaded_images">
            {postImages.map((img, i) => (
              <div key={i} className="uploaded_image">
                <img
                  src={
                    img.camera
                      ? img.camera
                      : img.url
                      ? img.url
                      : URL.createObjectURL(img)
                  }
                  alt="image"
                  className="img-thumbnail"
                />
                <span onClick={() => removeImage(i)}>x</span>
              </div>
            ))}
          </div>
          {strm && (
            <div className="video">
              <video width="100%" height="100%" autoPlay muted ref={ref} />
              <span onClick={stopRecording}>x</span>
              <canvas ref={refCanvas} className="d-none" />
            </div>
          )}
          <div className="images">
            {strm ? (
              <FontAwesomeIcon
                className="icon"
                onClick={captureVideo}
                icon={faCamera}
              />
            ) : (
              <>
                <FontAwesomeIcon
                  className="icon"
                  onClick={handleVideo}
                  icon={faCamera}
                />
                <div className="upload-img">
                  <FontAwesomeIcon className="upload-icon" icon={faImage} />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={addImageToPost}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-success" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Status;
