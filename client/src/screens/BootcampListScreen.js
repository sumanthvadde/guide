import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, Alert } from "react-bootstrap";
import { listBootcamps } from "../actions/bootcampActions";
import Paginate from "../components/Paginate";
import BootcampItem from "../components/BootcampItem";
import BootcampByLocationForm from "../components/BootcampByLocationForm";
import FilterBootcampsForm from "../components/FilterBootcampsForm";
import Loader from "../components/Loader";

const BootcampListScreen = (props) => {
  const dispatch = useDispatch();
  const page = props.match.params.page || 1;

  const { bootcamps, pages, loading, error } = useSelector(
    (state) => state.bootcampList
  );

  useEffect(() => {
    dispatch(listBootcamps({ page }));
  }, [dispatch, page]);

  return (
    <>
      <Row>
        <Col md={4}>
          <Card body className="mb-4">
            <h4 className="mb-3">By Location</h4>
            <BootcampByLocationForm />
          </Card>

          <h4>Filter</h4>
          <FilterBootcampsForm />
        </Col>
        <Col md={8}>
          {error && (
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          )}
          {loading ? (
            <Loader />
          ) : (
            bootcamps &&
            bootcamps.map((bootcamp) => (
              <BootcampItem key={bootcamp.id} bootcamp={bootcamp} />
            ))
          )}
          {pages ? <Paginate pages={pages} page={page} /> : null}
        </Col>
      </Row>
    </>
  );
};

export default BootcampListScreen;
