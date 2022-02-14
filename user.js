import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '~/api';
import { selectBranch } from '~/redux/action';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  GET_USER_POLICY_REQUEST,
  GET_USER_POLICY_SUCCESS,
  GET_USER_POLICY_FAILED
} from '~/constants/actionTypes';
import { setAxiosCompanyId, setAxiosToken } from '~/api/requester';

function* login({ payload: user }) {
  try {
    const { token, branchId } = yield call(Api.user.login, user);
    setAxiosToken(token);
    setAxiosCompanyId(branchId);
    const profile = yield call(Api.user.getProfile, token);
    yield put({ type: LOGIN_SUCCESS, payload: { token, branchId, profile } });
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: error });
  }
}

function* getProfile({ payload: token }) {
  try {
    const profile = yield call(Api.user.getProfile, token);
    yield put({ type: GET_PROFILE_SUCCESS, payload: profile });
  } catch (error) {
    yield put({ type: GET_PROFILE_FAILED, payload: error });
  }
}

function* getPolicy({ payload: branchId }) {
  try {
    setAxiosCompanyId(branchId);
    const policy = yield call(Api.user.getPolicy);
    yield put({ type: GET_USER_POLICY_SUCCESS, payload: policy });
    yield put(selectBranch(branchId));
  } catch (error) {
    setAxiosCompanyId(null);
    yield put({ type: GET_USER_POLICY_FAILED, payload: error });
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(GET_USER_POLICY_REQUEST, getPolicy);
}
