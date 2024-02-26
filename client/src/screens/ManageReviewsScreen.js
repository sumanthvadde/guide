import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import {
  deleteReview,
  listMyReviews,
  listReviews,
} from "../actions/reviewActions";
import { REVIEW_DELETE_RESET } from "../constants/reviewConstants";

const ManageReviewsScreen = ({ history, userInfo }) => {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews, loading, error } = reviewList;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = reviewDelete;

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(deleteReview(id));
  };

  useEffect(() => {
    if (userInfo.role === "publisher") {
      history.push("/");
    } else {
      if (!reviews?.length || deleteSuccess) {
        if ((userInfo.role = "admin")) {
          dispatch(listReviews());
        } else {
          dispatch(listMyReviews());
        }
        dispatch({ type: REVIEW_DELETE_RESET });
      }
    }
  }, [history, dispatch, deleteSuccess, userInfo, reviews?.length]);

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
          <Card.Body>
            <h1 className="mb-4">Manage Reviews</h1>
            {reviews?.length ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader />
                  ) : (
                    reviews.map((review) => (
                      <tr key={review._id}>
                        <td>{review.title}</td>
                        <td>
                          <Link to="#" className="btn btn-secondary">
                            <i
                              className="fas fa-pencil-alt"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(review._id)}
                          >
                            <i className="fas fa-times" aria-hidden="true"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            ) : (
              <>
                <p className="lead">You have not yet added any reviews</p>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ManageReviewsScreen;
