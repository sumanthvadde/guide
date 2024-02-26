import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  bootcampCreateReducer,
  bootcampDeleteReducer,
  bootcampDetailsReducer,
  bootcampListReducer,
  bootcampUpdateReducer,
} from "./reducers/bootcampReducers";
import {
  reviewListReducer,
  reviewDetailsReducer,
  reviewCreateReducer,
  reviewUpdateReducer,
  reviewDeleteReducer,
} from "./reducers/reviewReducers";
import {
  courseCreateReducer,
  courseDeleteReducer,
  courseDetailsReducer,
  courseUpdateReducer,
  courseListReducer,
} from "./reducers/courseReducer";

const reducer = combineReducers({
  bootcampList: bootcampListReducer,
  bootcampDetails: bootcampDetailsReducer,
  bootcampDelete: bootcampDeleteReducer,
  bootcampCreate: bootcampCreateReducer,
  bootcampUpdate: bootcampUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
  reviewCreate: reviewCreateReducer,
  reviewUpdate: reviewUpdateReducer,
  reviewDelete: reviewDeleteReducer,
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseDelete: courseDeleteReducer,
  courseCreate: courseCreateReducer,
  courseUpdate: courseUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
