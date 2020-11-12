import React, { useState, useEffect } from "react";
import { register, clear } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userReducer = useSelector((state) => state.userReducer);
  const { loading, error, userInfo } = userReducer;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(clear());
    }
  }, [userInfo, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, password));
  };

  return (
    <div id="registerPage">
      <div className="post">
        <h1>Create a new account</h1>
        {loading && <>loading...</>}
        {error && <div>{error}</div>}
        <form>
          <div className="form-group">
            <label htmlFor="name">User Name: </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your user name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
