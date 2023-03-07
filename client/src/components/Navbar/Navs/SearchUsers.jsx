import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GLOBALACTIONS } from "../../../redux/actions/global";
import { getData } from "../../../utils/fetch";
import User from "../../User";
import "../../../style/search.css";
import load from "../../../images/loading-gif.gif";

const SearchUsers = ({ setOpenSearch, openSearch }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const submitSearch = async (event) => {
    event.preventDefault();
    if (!search) return;
    try {
      setLoading(true);
      const res = await getData(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

  const clearSearchInput = () => {
    setSearch("");
  };

  const clearResults = () => {
    setSearch("");
    setUsers([]);
  };
  return (
    <div className="search-overlay">
      <div className="title">
        <h4>Search</h4>
        <button onClick={() => setOpenSearch(!openSearch)}>Close</button>
      </div>
      <form onSubmit={submitSearch}>
        <input
          type="text"
          name="search"
          value={search}
          id="search"
          title="Enter to Search"
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
          }
        />
        {!loading && <span onClick={clearSearchInput}>x</span>}
        {loading && (
          <span className="loading">
            <img src={load} alt="" />
          </span>
        )}
        <button type="submit">Search</button>
      </form>
      <hr />
      <div className="search-results">
        <div className="head">
          <h5>Recent</h5>
          <span onClick={clearResults}>Clear all</span>
        </div>
        <div className="users">
          {search &&
            users.map((user) => (
              <User search={search} key={user._id} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
