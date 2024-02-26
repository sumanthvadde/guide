import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import { getMyBootcamp } from "../actions/bootcampActions";
import { deleteCourse, listMyCourses } from "../actions/courseActions";
import BootcampItem from "../components/BootcampItem";
import { MY_COURSE_DELETE_RESET } from "../constants/courseConstants";

const ManageCoursesScreen = ({ history, userInfo }) => {
  const dispatch = useDispatch();

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, bootcamp } = bootcampDetails;

  const courseList = useSelector((state) => state.courseList);
  const { courses, error } = courseList;

  const courseDelete = useSelector((state) => state.courseDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = courseDelete;

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(deleteCourse(id));
  };

  useEffect(() => {
    if (userInfo.role === "user") {
      history.push("/");
    } else {
      if (!bootcamp?.id) {
        dispatch(getMyBootcamp());
      } else {
        if (!courses.length || deleteSuccess) {
          dispatch(listMyCourses(bootcamp.id));
          dispatch({ type: MY_COURSE_DELETE_RESET });
        }
      }
    }
  }, [
    history,
    dispatch,
    deleteSuccess,
    bootcamp,
    courses.length,
    userInfo.role,
  ]);

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          {deleteLoading && <Loader />}
          {error && (
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          )}
          {deleteError && (
            <Alert variant="danger" dismissible>
              {deleteError}
            </Alert>
          )}
          {loading && !bootcamp ? (
            <Loader />
          ) : (
            <Card.Body>
              <Link
                to="/manage-bootcamp"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              {bootcamp?.location && <BootcampItem bootcamp={bootcamp} />}
              <Link
                to={`/bootcamp/${bootcamp?.id}/add-course`}
                className="btn btn-primary btn-block mb-4"
              >
                Add Bootcamp Course
              </Link>
              {courses?.length ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course._id}>
                        <td>{course.title}</td>
                        <td>
                          <Link
                            to={`/bootcamp/${bootcamp.id}/course/${course._id}/edit`}
                            className="btn btn-secondary"
                          >
                            <i
                              className="fas fa-pencil-alt"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(course._id)}
                          >
                            <i className="fas fa-times" aria-hidden="true"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <>
                  <p className="lead">You have not yet added any courses</p>
                </>
              )}
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ManageCoursesScreen;
