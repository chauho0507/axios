import { put, call, takeLatest } from "redux-saga/effects";
import Api from "./api";
import {
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILED,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
  GET_BRANCH_FAILED,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAILED,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAILED,
  DELETE_BRANCH_REQUEST,
  DELETE_BRANCH_SUCCESS,
  DELETE_BRANCH_FAILED,
} from "~/constants/actionTypes";

function* getBranches({ payload: query }) {
  try {
    const response = yield call(Api.branch.getAll, query);
    yield put({ type: GET_BRANCHES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_BRANCHES_FAILED, payload: error.message });
  }
}

function* getBranch({ payload: id }) {
  try {
    const branch = yield call(Api.branch.getById, id);
    yield put({ type: GET_BRANCH_SUCCESS, payload: branch });
  } catch (error) {
    yield put({ type: GET_BRANCH_FAILED, payload: error.message });
  }
}

function* createBranch(action) {
  try {
    const data = yield call(Api.branch.create, action.payload);
    yield put({ type: CREATE_BRANCH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: CREATE_BRANCH_FAILED, payload: error.message });
  }
}

function* updateBranch(action) {
  try {
    const data = yield call(Api.branch.update, action.payload);
    yield put({ type: UPDATE_BRANCH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: UPDATE_BRANCH_FAILED, payload: error.message });
  }
}

function* deleteBranch({ payload }) {
  try {
    yield call(Api.branch.delete, payload);
    yield put({ type: DELETE_BRANCH_SUCCESS, payload });
  } catch (error) {
    yield put({ type: DELETE_BRANCH_FAILED, payload: error.message });
  }
}

export default function* branch() {
  yield takeLatest(GET_BRANCHES_REQUEST, getBranches);
  yield takeLatest(GET_BRANCH_REQUEST, getBranch);
  yield takeLatest(DELETE_BRANCH_REQUEST, deleteBranch);
  yield takeLatest(CREATE_BRANCH_REQUEST, createBranch);
  yield takeLatest(UPDATE_BRANCH_REQUEST, updateBranch);
}
