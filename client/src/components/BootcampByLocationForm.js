import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { listBootcampsByRadius } from "../actions/bootcampActions";

const BootcampByLocationForm = ({ counter, setCounter = null }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const submit = ({ zipcode, distance }) => {
    dispatch(listBootcampsByRadius(zipcode, distance));
    setCounter && setCounter(counter + 1);
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              placeholder="Miles From"
              isInvalid={!!errors.distance}
              isValid={!errors.distance && dirtyFields.distance}
              {...register("distance", {
                required: "Distance is required",
              })}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.distance?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              placeholder="Enter Zipcode"
              isInvalid={!!errors.zipcode}
              isValid={!errors.zipcode && dirtyFields.zipcode}
              {...register("zipcode", {
                required: "Zipcode is required",
              })}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.zipcode?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Control
        type="submit"
        disabled={isSubmitting || !isValid}
        value="Find Bootcamps"
        className="btn btn-primary btn-block"
      />
    </Form>
  );
};

export default BootcampByLocationForm;
