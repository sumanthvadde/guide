import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Card, Col, Form, Row } from "react-bootstrap";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import Loader from "../components/Loader";

const ManageAccountScreen = ({ history, userInfo }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success } = userDetails;

  useEffect(() => {
    if (!user?.name) {
      dispatch(getUserDetails());
    } else {
      setValue("name", user.name, { shouldValidate: true });
      setValue("email", user.email, { shouldValidate: true });
    }
  }, [userInfo, history, dispatch, user, setValue]);

  const submit = ({ name, email }) => {
    dispatch(updateUserDetails({ name, email }));
  };

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          {loading ? (
            <Loader />
          ) : (
            <Card.Body>
              <h1 className="mb-2">Manage Account</h1>
              {error && (
                <Alert variant="danger" dismissible>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" dismissible>
                  Account Updated
                </Alert>
              )}
              <Form onSubmit={handleSubmit(submit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    isInvalid={!!errors.name}
                    isValid={!errors.name && dirtyFields.name}
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Email"
                    isInvalid={!!errors.email}
                    isValid={!errors.email && dirtyFields.email}
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
                <Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        type="submit"
                        value="Save"
                        disabled={isSubmitting || !isValid}
                        className="btn btn-success btn-block"
                      />
                    </Col>
                    <Col md={6}>
                      <Link
                        to="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ManageAccountScreen;
