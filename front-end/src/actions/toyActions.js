import {
  TOY_BROWSE_REQUEST,
  TOY_BROWSE_SUCCESS,
  TOY_BROWSE_FAIL,
  TOY_DETAIL_REQUEST,
  TOY_DETAIL_SUCCESS,
  TOY_DETAIL_FAIL,
  TOY_POST_REQUEST,
  TOY_POST_SUCCESS,
  TOY_POST_FAIL,
  TOY_EDIT_REQUEST,
  TOY_EDIT_SUCCESS,
  TOY_EDIT_FAIL,
  TOY_DELETE_REQUEST,
  TOY_DELETE_SUCCESS,
  TOY_DELETE_FAIL,
  TOY_IMAGE_UPLOAD,
  TOY_IMAGE_UPLOAD_FAIL,
  TOY_DONE_CHANGE_DIR,
} from "../constants/toyConstants";

import Axios from "../axios";

export const toyBrowse = () => async (dispatch) => {
  dispatch({
    type: TOY_BROWSE_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/toys");
    dispatch({
      type: TOY_BROWSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOY_BROWSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailToy = (id) => async (dispatch) => {
  dispatch({
    type: TOY_DETAIL_REQUEST,
    payload: id,
  });
  try {
    const { data } = await Axios.get(`/api/toys/${id}`);
    dispatch({
      type: TOY_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOY_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toyPost = (name, fileUpload, rentPrice, salePrice) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: TOY_POST_REQUEST,
    action: { name, fileUpload, rentPrice, salePrice },
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      "/api/toys",
      { name, imgSrc: fileUpload, rentPrice, salePrice },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: TOY_POST_SUCCESS,
      payload: data.toy,
    });
  } catch (error) {
    dispatch({
      type: TOY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editToy = (id, name, fileUpload, rentPrice, salePrice) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: TOY_EDIT_REQUEST,
    payload: id,
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/toys/${id}`,
      { name, imgSrc: fileUpload, rentPrice, salePrice },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: TOY_EDIT_SUCCESS,
      payload: data.toy,
    });
  } catch (error) {
    dispatch({
      type: TOY_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteToy = (id) => async (dispatch, getState) => {
  dispatch({
    type: TOY_DELETE_REQUEST,
    payload: id,
  });
  try {
    const {
      userReducer: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/toys/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: TOY_DELETE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: TOY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toyUploadImage = (formData) => async (dispatch) => {
  try {
    const response = await Axios.post("/api/toys/uploadImage", formData, {
      header: { "content-type": "multipart/form-data" },
    });
    if (response.data.success) {
      dispatch({
        type: TOY_IMAGE_UPLOAD,
        payload: response.data.image,
      });
    }
  } catch (error) {
    dispatch({
      type: TOY_IMAGE_UPLOAD_FAIL,
      payload: "Failed to save the Image in Server",
    });
  }
};

export const toyDoneChangeDir = () => async (dispatch) => {
  dispatch({ type: TOY_DONE_CHANGE_DIR });
};
