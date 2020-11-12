import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toyBrowse } from "../actions/toyActions";
import { useSelector, useDispatch } from "react-redux";

function BrowseScreen() {
  const { loading, error, toys } = useSelector((state) => state.toyReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toyBrowse());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {" "}
          <div className="jumbotron jumbotron-fluid my-5">
            <div className="container">
              <h1 className="display-4">
                <i className="fas fa-child"></i> <i className="fas fa-car"></i>
                <i className="fab fa-dribbble"></i> Explore toys
              </h1>
            </div>
          </div>
          <div id="toy">
            <div className="container">
              <div className="row">
                {toys?.map((toy) => (
                  <div
                    key={toy._id}
                    className="col-10 mx-auto my-3 col-md-6 col-lg-4"
                  >
                    <div className="card">
                      <img
                        src={
                          toy.imgSrc
                            ? `http://localhost:8000/${toy.imgSrc}`
                            : ""
                        }
                        className="card-img-top"
                        alt={toy.name}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{toy.name}</h5>
                        <Link
                          to={`/toy/${toy._id}`}
                          className="btn btn-primary"
                        >
                          More Info
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BrowseScreen;
