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

export const toyReducer = (state = {}, action) => {
  switch (action.type) {
    case TOY_BROWSE_REQUEST:
      return { loading: true };
    case TOY_BROWSE_SUCCESS:
      return { loading: false, toys: action.payload };
    case TOY_BROWSE_FAIL:
      return { loading: false, error: action.payload };
    case TOY_DETAIL_REQUEST:
      return { loading: true };
    case TOY_DETAIL_SUCCESS:
      return { loading: false, toy: action.payload };
    case TOY_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case TOY_POST_REQUEST:
      return { loading: true };
    case TOY_POST_SUCCESS:
      return { loading: false, toy: action.payload, success: true };
    case TOY_POST_FAIL:
      return { loading: false, error: action.payload };
    case TOY_EDIT_REQUEST:
      return { loading: true };
    case TOY_EDIT_SUCCESS:
      return { loading: false, toy: action.payload, success: true };
    case TOY_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case TOY_DELETE_REQUEST:
      return { loading: true };
    case TOY_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case TOY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TOY_IMAGE_UPLOAD:
      return { ...state, src: action.payload };
    case TOY_IMAGE_UPLOAD_FAIL:
      return { message: action.payload };
    case TOY_DONE_CHANGE_DIR:
      return {};
    default:
      return state;
  }
};
