import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loader />
        ) : userInfo ? (
          <Component {...props} userInfo={userInfo} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
