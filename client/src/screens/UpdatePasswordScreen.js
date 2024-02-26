import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Card, Col, Form, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import { updatePassword } from "../actions/userActions";

const UpdatePasswordScreen = ({ history, userInfo }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, success } = userDetails;

  const submit = (data) => {
    dispatch(updatePassword(data));
  };

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          {loading && <Loader />}
          <Card.Body>
            <h1 className="mb-2">Update Password</h1>
            {error && (
              <Alert variant="danger" dismissible>
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" dismissible>
                Password Updated
              </Alert>
            )}
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  autocomplete="off"
                  type="password"
                  placeholder="Current Password"
                  isInvalid={!!errors.currentPassword}
                  isValid={
                    !errors.currentPassword && dirtyFields.currentPassword
                  }
                  {...register("currentPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                    pattern: {
                      message:
                        "Please enter a valid password with at least 6 chars",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.currentPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  isInvalid={!!errors.newPassword}
                  isValid={!errors.newPassword && dirtyFields.newPassword}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                    pattern: {
                      message:
                        "Please enter a valid password with at least 6 chars",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  isInvalid={!!errors.confirmPassword}
                  isValid={
                    !errors.confirmPassword && dirtyFields.confirmPassword
                  }
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: {
                      value: (value) =>
                        value === watch("newPassword", "") ||
                        "The passwords do not match",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="submit"
                  value="Update Password"
                  disabled={isSubmitting || !isValid}
                  className="btn btn-dark btn-block"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdatePasswordScreen;
