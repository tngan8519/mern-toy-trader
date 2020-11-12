import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
  };
  console.log(userReducer);
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top text-capitalize">
      <Link className="navbar-brand" to="/">
        Toy Trader
      </Link>
      <div className="d-flex justify-content-end">
        {userInfo && (
          <>
            <Link className="nav-link disabled" to="/#">
              Hello {userInfo.username}
            </Link>
            <Link onClick={handleLogout} className="nav-link" to="/#">
              Sign Out
            </Link>

            <Link className="nav-link" to="/post">
              Post
            </Link>
          </>
        )}
        {!userInfo && (
          <>
            <Link className="nav-link" to="/login">
              Sign In
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/browse">
              Browse
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
