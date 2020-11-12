import React from "react";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <>
      <div className="main d-flex align-items-center justify-content-center text-capitalize">
        <div>
          <div className="text-center py-3 title">
            <span className="welcome">welcome</span> to toy trader
          </div>
          <div className="d-flex justify-content-center">
            <Link className="btn mx-2 btnOne" to="/post">
              post toy
            </Link>
            <Link className="btn mx-2 btnTwo" to="/browse">
              browse toy
            </Link>
          </div>
        </div>
      </div>
      <div className="changeBcg">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default HomeScreen;
