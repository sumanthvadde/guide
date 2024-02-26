import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Row, Col, Card, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import { getMyBootcamp } from "../actions/bootcampActions";
import {
  createCourse,
  listCourseDetails,
  updateCourse,
} from "../actions/courseActions";
import {
  MY_COURSE_DETAILS_RESET,
  MY_COURSE_LIST_RESET,
  MY_COURSE_CREATE_RESET,
  MY_COURSE_UPDATE_RESET,
} from "../constants/courseConstants";

const fields = [
  "_id",
  "title",
  "weeks",
  "tuition",
  "minimumSkill",
  "description",
  "scholarshipAvailable",
];

const CourseFormScreen = ({ match, history }) => {
  const { bootcampId } = match.params;
  const { courseId } = match.params;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const courseUpdate = useSelector((state) => state.courseUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = courseUpdate;

  const courseCreate = useSelector((state) => state.courseCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = courseCreate;

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { bootcamp } = bootcampDetails;

  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, course, error } = courseDetails;

  useEffect(() => {
    if (userInfo.role === "user") history.push("/");
    else {
      !bootcamp && dispatch(getMyBootcamp());
      courseId && !course?.title && dispatch(listCourseDetails(courseId));
      course.title &&
        fields.map((f) => setValue(f, course[f], { shouldValidate: true }));
    }
  }, [
    bootcamp,
    bootcampId,
    course,
    history,
    dispatch,
    courseId,
    course.title,
    setValue,
    userInfo.role,
  ]);

  useEffect(() => {
    if (createSuccess) {
      dispatch({ type: MY_COURSE_CREATE_RESET });
      dispatch({ type: MY_COURSE_LIST_RESET });
      history.push("/manage-courses");
    }
    if (updateSuccess) {
      dispatch({ type: MY_COURSE_UPDATE_RESET });
      dispatch({ type: MY_COURSE_LIST_RESET });
      history.push("/manage-courses");
    }
    return () => dispatch({ type: MY_COURSE_DETAILS_RESET });
  }, [dispatch, updateSuccess, createSuccess, history]);

  const submitCourse = async (data) => {
    try {
      if (courseId) {
        await dispatch(updateCourse(data));
      } else {
        await dispatch(createCourse(bootcampId, data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      <Col md={8} className="m-auto">
        {error && (
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
        )}
        {updateError && (
          <Alert variant="danger" dismissible>
            {updateError}
          </Alert>
        )}
        {createError && (
          <Alert variant="danger" dismissible>
            {createError}
          </Alert>
        )}
        {loading ? (
          <Loader />
        ) : (
          <Card className="bg-white py-2 px-4">
            <Card.Body>
              <Link
                to="/manage-courses"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Courses
              </Link>
              <h1 className="mb-2">{bootcamp.name}</h1>
              {loading || updateLoading || (createLoading && <Loader />)}
              <h3 className="text-primary mb-4">Add Course</h3>
              <Form onSubmit={handleSubmit(submitCourse)}>
                <Form.Group>
                  <Form.Label>Course Title</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    isInvalid={!!errors.title}
                    isValid={!errors.title && dirtyFields.title}
                    {...register("title", {
                      required: "Name is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    placeholder="Duration"
                    type="number"
                    isInvalid={!!errors.weeks}
                    isValid={!errors.weeks && dirtyFields.weeks}
                    {...register("weeks", {
                      required: "Name is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.weeks?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Enter number of weeks course lasts
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Course Tuition</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Tuition"
                    isInvalid={!!errors.tuition}
                    isValid={!errors.tuition && dirtyFields.tuition}
                    {...register("tuition", {
                      required: "Name is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.tuition?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">USD Currency</Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Minimum Skill Required</Form.Label>
                  <Form.Control as="select" {...register("minimumSkill")}>
                    <option value="beginner" selected>
                      Beginner (Any)
                    </option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    isInvalid={!!errors.description}
                    isValid={!errors.description && dirtyFields.description}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    No more than 500 characters
                  </Form.Text>
                </Form.Group>
                <Form.Check>
                  <Form.Check.Input
                    type="checkbox"
                    id="scholarshipAvailable"
                    {...register("scholarshipAvailable")}
                  />
                  <Form.Check.Label htmlFor="scholarshipAvailable">
                    Scholarship Available
                  </Form.Check.Label>
                </Form.Check>
                <Form.Group className="mt-4">
                  <Form.Control
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    value={`${courseId ? "Save" : "Add"} Course`}
                    className="btn btn-dark btn-block"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default CourseFormScreen;
