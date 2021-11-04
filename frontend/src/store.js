import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addEventReducer } from "./reducers/eventReducers";
import {
  createTeamReducer,
  filterTeamsReducer,
  myTeamsReducer,
  teamViewReducer,
} from "./reducers/teamReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  getBasicInformationReducer,
  updateBasicInformationReducer,
  getSkillsReducer,
  getLanguagesReducer,
  getExperienceReducer,
  getEducationReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  basicInformation: getBasicInformationReducer,
  updateBasicInformation: updateBasicInformationReducer,
  skills: getSkillsReducer,
  languages: getLanguagesReducer,
  experience: getExperienceReducer,
  education: getEducationReducer,
  addEventReducer: addEventReducer,
  createTeamReducer: createTeamReducer,
  myteams: myTeamsReducer,
  teamview: teamViewReducer,
  filteredteams: filterTeamsReducer,
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
