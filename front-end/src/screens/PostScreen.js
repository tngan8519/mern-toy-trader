import React, { useState, useEffect } from "react";
import {
  toyPost,
  toyUploadImage,
  toyDoneChangeDir,
} from "../actions/toyActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "../axios";

function PostScreen() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  // const [file, setFile] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [fileUpload, setFileUpload] = useState("");

  const { loading, error, success, src } = useSelector(
    (state) => state.toyReducer
  );

  useEffect(() => {
    if (success) {
      dispatch(toyDoneChangeDir());
      history.push("/browse");
    }
  }, [success, dispatch, history]);

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
    dispatch(toyPost(name, fileUpload, rentPrice, salePrice));
  };

  return (
    <div id="postPage">
      <div className="post">
        <h1>Create a new post</h1>
        {loading && <>loading...</>}
        {error && <div>{error}</div>}
        <form>
          <div className="form-group">
            <label htmlFor="name">Toy Name: </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your toy name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pic">Image: </label>

            <input
              type="file"
              onChange={handleFile}
              className="form-control-file"
              id="pic"
              required
            />
            {fileUpload && (
              <img
                src={fileUpload ? `http://localhost:8000/${fileUpload}` : ""}
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
                placeholder="Enter rent price"
                min="0.01"
                step="0.01"
                required
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
                placeholder="Enter sale price"
                min="0.01"
                step="0.01"
                required
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
        </form>
      </div>
    </div>
  );
}

export default PostScreen;
