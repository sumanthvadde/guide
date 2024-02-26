import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { listBootcamps } from "../actions/bootcampActions";

const FilterBootcampsForm = ({ counter, setCounter = null }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const submit = ({ averageRating, averageCoust }) => {
    dispatch(listBootcamps({ averageRating, averageCoust }));
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Group>
        <Form.Label> Rating</Form.Label>
        <Form.Control
          as="select"
          defaultValue="any"
          className="mb-2"
          custom
          isInvalid={!!errors.averageRating}
          isValid={!errors.averageRating && dirtyFields.averageRating}
          {...register("averageRating", {
            required: "Average Rating is required",
          })}
        >
          <option value="0">Any</option>
          <option value="9">9+</option>
          <option value="8">8+</option>
          <option value="7">7+</option>
          <option value="6">6+</option>
          <option value="5">5+</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
          <option value="2">2+</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.averageRating?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        averageCost
        <Form.Label> Budget</Form.Label>
        <Form.Control
          as="select"
          defaultValue="any"
          className="mb-2"
          custom
          isInvalid={!!errors.averageCost}
          isValid={!errors.averageCost && dirtyFields.averageCost}
          {...register("averageCost", {
            required: "Average cost is required",
          })}
        >
          <option value="0">Any</option>
          <option value="20000">$20,000</option>
          <option value="15000">$15,000</option>
          <option value="10000">$10,000</option>
          <option value="8000">$8,000</option>
          <option value="6000">$6,000</option>
          <option value="4000">$4,000</option>
          <option value="2000">$2,000</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.averageCost?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Control
        type="submit"
        value="Find Bootcamps"
        className="btn btn-primary mb-4 btn-block"
        disabled={isSubmitting || !isValid}
      />
    </Form>
  );
};

export default FilterBootcampsForm;
