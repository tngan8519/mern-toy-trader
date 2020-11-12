import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  detailToy,
  editToy,
  toyUploadImage,
  toyDoneChangeDir,
} from "../actions/toyActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";

function EditScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [name, setName] = useState("");
  // const [file, setFile] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [fileUpload, setFileUpload] = useState("");

  const toyReducer = useSelector((state) => state.toyReducer);
  const {
    loading,
    error,
    toy,
    loading: loadingEdit,
    error: errorEdit,
    success,
    src,
  } = toyReducer;

  useEffect(() => {
    setName(toy?.name);
    setRentPrice(toy?.rentPrice);
    setSalePrice(toy?.salePrice);
  }, [toy]);

  useEffect(() => {
    dispatch(detailToy(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(toyDoneChangeDir());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      history.push(`/toy/${id}`);
    }
  }, [success, dispatch, history, id]);

  useEffect(() => {
    setFileUpload(src);
  }, [src]);

  const handleFile = (e) => {
    if (fileUpload) {
      axios
        .post("/api/toys/deleteImage", { fileName: fileUpload })
        .then((response) => console.log(response));
    }
    // setFile(e.target.files[0]);

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(toyUploadImage(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editToy(id, name, fileUpload, rentPrice, salePrice));
  };

  return (
    <>
      {loading ? (
        <div>loading ...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div id="editToy">
          <div className="post">
            <h1>Edit {toy?.name}</h1>
            <form>
              <div className="form-group">
                <label htmlFor="name">Toy Name: </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                  name="toyname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="pic">Image: </label>

                <div>
                  <img
                    src={
                      toy?.imgSrc ? `http://localhost:8000/${toy?.imgSrc}` : ""
                    }
                    alt=""
                    width="50%"
                  />
                </div>
                <input
                  type="file"
                  onChange={handleFile}
                  className="form-control-file"
                  id="pic"
                  required
                />
                {fileUpload && (
                  <img
                    src={`http://localhost:8000/${fileUpload}`}
                    className="post__img"
                    alt=""
                  />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="rent">Rent price: </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    value={rentPrice}
                    onChange={(e) => setRentPrice(e.target.value)}
                    type="number"
                    className="form-control"
                    id="rent"
                    name="rentprice"
                    min="0.01"
                    step="0.01"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">/ week rent</div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sale">Sale price: </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    type="number"
                    className="form-control"
                    id="sale"
                    name="saleprice"
                    min="0.01"
                    step="0.01"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">/ buy</div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
              {loadingEdit && <div>loading ...</div>}
              {errorEdit && <div>{errorEdit}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditScreen;
