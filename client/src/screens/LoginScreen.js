import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Alert, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submit = ({ email, password }) => {
    dispatch(login(email, password));
  };

  return (
    <Row>
      <Col md={6} className="m-auto">
        <Card className="bg-white p-4 mb-4">
          <Card.Body>
            <h1>
              <i className="fas fa-sign-in-alt"></i> Login
            </h1>
            {loading && <Loader />}
            {error && (
              <Alert variant="danger" dismissible>
                {error}
              </Alert>
            )}
            <p>
              Log in to list your bootcamp or rate, review and favorite
              bootcamps
            </p>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  isInvalid={!!errors.email}
                  isValid={!errors.email && dirtyFields.email}
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  isInvalid={!!errors.password}
                  isValid={!errors.password && dirtyFields.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                    pattern: {
                      message:
                        "Please enter a valid password with at least 6 chars",
                    },
                  })}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="submit"
                  value={loading ? "Loading..." : "Login"}
                  className="btn btn-primary btn-block"
                  disabled={!isValid || isSubmitting}
                />
              </Form.Group>
            </Form>
            <p>
              Forgot Password? <Link to="/reset-password">Reset Password</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
