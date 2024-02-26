import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BootcampListScreen from "./screens/BootcampListScreen";
import ManageAccountScreen from "./screens/ManageAccountScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import BootcampScreen from "./screens/BootcampScreen";
import BootcampReviewsScreen from "./screens/BootcampReviewsScreen";
import ManageBootcampScreen from "./screens/ManageBootcampScreen";
import ManageCoursesScreen from "./screens/ManageCoursesScreen";
import ManageReviewsScreen from "./screens/ManageReviewsScreen";
import BootcampFormScreen from "./screens/BootcampFormScreen";
import ReviewFormScreen from "./screens/ReviewFormScreen";
import CourseFormScreen from "./screens/CourseFormScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container className="mt-5">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/reset-password" component={ResetPasswordScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route exact path="/bootcamps/:page" component={BootcampListScreen} />
          <Route exact path="/bootcamps/" component={BootcampListScreen} />
          <PrivateRoute
            path="/bootcamp/:bootcampId/edit"
            component={BootcampFormScreen}
          />
          <Route
            exact
            path="/bootcamp/:bootcampId"
            component={BootcampScreen}
          />
          <PrivateRoute
            exact
            path="/add-bootcamp"
            component={BootcampFormScreen}
          />
          <Route
            path="/bootcamp/:bootcampId/reviews"
            component={BootcampReviewsScreen}
          />
          <PrivateRoute
            path="/bootcamp/:bootcampId/add-review"
            component={ReviewFormScreen}
          />
          <PrivateRoute
            path="/manage-account"
            component={ManageAccountScreen}
          />
          <PrivateRoute
            path="/update-password"
            component={UpdatePasswordScreen}
          />
          <PrivateRoute
            path="/manage-bootcamp"
            component={ManageBootcampScreen}
          />
          <PrivateRoute
            path="/manage-courses"
            component={ManageCoursesScreen}
          />
          <PrivateRoute
            path="/bootcamp/:bootcampId/manage-courses"
            component={ManageCoursesScreen}
          />
          <PrivateRoute
            path="/manage-reviews"
            component={ManageReviewsScreen}
          />
          <PrivateRoute
            path="/bootcamp/:bootcampId/add-course"
            component={CourseFormScreen}
          />
          <PrivateRoute
            path="/bootcamp/:bootcampId/course/:courseId/edit"
            component={CourseFormScreen}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
