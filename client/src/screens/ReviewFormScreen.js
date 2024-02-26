import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Card, Col, Row, Form } from "react-bootstrap";
import { createBootcampReview } from "../actions/reviewActions";
import { listBootcampDetails } from "../actions/bootcampActions";

function ReviewAddScreen({ match, history }) {
  const { bootcampId } = match.params;

  const {
    register,
    handleSubmit,
    // setValue,
    watch,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const submitHandler = (data) => {
    dispatch(createBootcampReview(bootcampId, data));
    dispatch(listBootcampDetails(bootcampId));
    history.push(`/bootcamp/${bootcampId}/reviews`);
  };

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          <Card.Body>
            <Link
              to={`/bootcamp/${bootcampId}`}
              className="btn btn-link text-secondary my-3"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>{" "}
              Bootcamp Info
            </Link>
            <h1 className="mb-2">DevWorks Bootcamp</h1>
            <h3 className="text-primary mb-4">Write a Review</h3>
            <p>You must have attended and graduated this bootcamp to review</p>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group>
                Rating:{" "}
                <span className="text-primary">{watch("rating", "")}</span>
                <Form.Control
                  type="range"
                  id="rating"
                  className="custom-range"
                  min="1"
                  max="10"
                  step="1"
                  isInvalid={!!errors.rating}
                  isValid={!errors.rating && dirtyFields.rating}
                  {...register("rating")}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.rating?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Review title"
                  isInvalid={!!errors.title}
                  isValid={!errors.title && dirtyFields.title}
                  {...register("title", {
                    required: "review title is required",
                  })}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="Your review"
                  rows="10"
                  isInvalid={!!errors.text}
                  isValid={!errors.text && dirtyFields.text}
                  {...register("text", {
                    required: "review is required",
                  })}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.text?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="submit"
                  value="Submit Review"
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
}

export default ReviewAddScreen;
