import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALACTIONS } from "../../redux/actions/global";
import { updateUserInfo } from "../../redux/actions/userProfile";
import "../../style/user.css";
import { validateImage } from "../../utils/uploadImage";

const UpdateProfile = ({ user, setEdit }) => {
  const state = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    about: "",
    gender: "",
  };

  const [userData, setuserData] = useState(state);

  const { fullname, mobile, address, website, about, gender } = userData;

  const { auth, theme } = useSelector((state) => state);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const editImage = (e) => {
    const selectImage = e.target.files[0];
    const customError = validateImage(selectImage);
    if (customError)
      return dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: customError },
      });
    setAvatar(selectImage);
  };
  const handleEdit = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo({ userData, avatar, auth }));
    setEdit(false);
  };

  useEffect(() => {
    setuserData(user);
  }, [user]);
  return (
    <div style={{ zIndex: 99 }} className="update-profile">
      <button
        className="btn closeEdit btn-danger"
        onClick={() => setEdit(false)}
      >
        Close
      </button>
      <form onSubmit={submitEdit}>
        <div className="image">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt=""
          />
          <span>
            <FontAwesomeIcon icon={faCamera} />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="download"
              accept="image/*"
              onChange={editImage}
            />
          </span>
        </div>
        <div className="info">
          <div className="form-group fullname">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleEdit}
            />
            <small className="text-danger">{fullname.length}/25</small>
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Number</label>
            <input
              type="number"
              className="form-control"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleEdit}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={handleEdit}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              className="form-control"
              id="website"
              name="website"
              value={website}
              onChange={handleEdit}
            />
          </div>
          <div className="form-group">
            <label htmlFor="about">About</label>
            <textarea
              className="form-control"
              id="about"
              name="about"
              value={about}
              onChange={handleEdit}
            />
          </div>
          <label htmlFor="gender">Gender</label>
          <div className="input-group-prepend">
            <select
              name="gender"
              className="w-100"
              id="gender"
              value={gender}
              onChange={handleEdit}
            >
              <option value="male">Male</option>
              <option value="women">Women</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
