import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { detailToy, deleteToy, toyDoneChangeDir } from "../actions/toyActions";
import { useSelector, useDispatch } from "react-redux";

function DetailScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const {
    loading,
    error,
    toy,
    loading: loadingDelete,
    error: errorDelete,
    message,
  } = useSelector((state) => state.toyReducer);

  const { userInfo } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(detailToy(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (message) {
      dispatch(toyDoneChangeDir());
      history.push("/browse");
    }
  }, [message, dispatch, history]);

  const handleDelete = (toyid) => {
    dispatch(deleteToy(toyid));
  };

  return (
    <>
      {loading ? (
        <div>loading ...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="containerDetail">
          <div className="card the">
            <div className="row no-gutters">
              <div className="col-md-7 col-lg-6 d-flex align-items-center">
                <img
                  src={
                    toy?.imgSrc ? `http://localhost:8000/${toy?.imgSrc}` : ""
                  }
                  className="card-img"
                  alt={toy?.name}
                />
              </div>
              <div className="col-md-4 offset-md-1 col-lg-4">
                <div className="card-body">
                  <h5 className="card-title text-info">{toy?.name}</h5>
                  <p className="card-text"> {toy?.rentPrice} /week rent</p>
                  <p className="card-text"> {toy?.salePrice} /buy</p>
                  <p className="card-text">or trade</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Created by {toy?.author.username} -{" "}
                      {new Date(toy?.createdAt).toUTCString()}
                    </small>
                  </p>

                  {userInfo && toy?.author._id === userInfo._id && (
                    <>
                      <Link
                        to={`/toy/${toy._id}/edit`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(toy?._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      {loadingDelete && <div>loading ...</div>}
                      {errorDelete && <div>{errorDelete}</div>}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailScreen;
