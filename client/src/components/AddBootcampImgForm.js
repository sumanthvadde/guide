import { Form } from "react-bootstrap";

const AddBootcampImgForm = () => {
  return (
    <Form className="mb-4">
      <Form.Group>
        <div className="custom-file">
          <input
            type="file"
            name="photo"
            className="custom-file-input"
            id="photo"
          />
          <Form.Label className="custom-file-label" htmlFor="photo">
            Add Bootcamp Image
          </Form.Label>
        </div>
      </Form.Group>
      <input
        type="submit"
        className="btn btn-light btn-block"
        value="Upload Image"
      />
    </Form>
  );
};

export default AddBootcampImgForm;
