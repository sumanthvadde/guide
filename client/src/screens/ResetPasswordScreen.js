import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Col, Form, Row } from "react-bootstrap";

const ResetPasswordScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Card className="bg-white py-2 px-4">
          <Card.Body>
            <Link to="/login">Back to login</Link>
            <h1 className="mb-2">Reset Password</h1>
            <p>
              Use this form to reset your password using the registered email
              address.
            </p>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group>
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  placeholder="Email address"
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
                <Form.Control
                  type="submit"
                  value="Reset Password"
                  className="btn btn-dark btn-block"
                  disabled={isSubmitting || !isValid}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordScreen;
