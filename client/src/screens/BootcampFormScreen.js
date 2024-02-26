import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert, Row, Col, Card, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import {
	updateBootcamp,
	createBootcamp,
	getMyBootcamp,
} from "../actions/bootcampActions";
import {
	BOOTCAMP_CREATE_RESET,
	BOOTCAMP_UPDATE_RESET,
} from "../constants/bootcampConstants";

const fields = [
	"_id",
	"name",
	"description",
	"website",
	"phone",
	"email",
	"careers",
	"jobAssistance",
	"jobGuarantee",
	"acceptGi",
	"housing",
];

const BootcampFormScreen = ({ match, history, userInfo }) => {
	const { bootcampId } = match.params;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid, dirtyFields },
	} = useForm({
		mode: "onChange",
	});

	const dispatch = useDispatch();

	const bootcampUpdate = useSelector((state) => state.bootcampUpdate);
	const {
		loading: updateLoading,
		error: updateError,
		success: updateSuccess,
	} = bootcampUpdate;

	const bootcampCreate = useSelector((state) => state.bootcampCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = bootcampCreate;

	const bootcampDetails = useSelector((state) => state.bootcampDetails);
	const { loading, error, bootcamp } = bootcampDetails;

	useEffect(() => {
		if (userInfo.role === "user") history.push("/");
		if (updateSuccess) {
			dispatch({ type: BOOTCAMP_UPDATE_RESET });
			history.push("/manage-bootcamp");
		}
		if (createSuccess) {
			dispatch({ type: BOOTCAMP_CREATE_RESET });
			history.push("/manage-bootcamp");
		}
		if (bootcampId) {
			if (!bootcamp || !bootcamp._id) {
				dispatch(getMyBootcamp());
			} else {
				fields.map((f) => setValue(f, bootcamp[f], { shouldValidate: true }));
				setValue(
					"address",
					`${bootcamp.location.street}, ${bootcamp.location.city}, ${bootcamp.location.state}, ${bootcamp.location.zipcode}`
				);
			}
		}
	}, [
		setValue,
		bootcampId,
		dispatch,
		userInfo,
		history,
		bootcamp,
		updateSuccess,
		createSuccess,
	]);

	const SubmitBoocamp = async (data) => {
		try {
			if (bootcampId) {
				await dispatch(updateBootcamp(data));
			} else {
				await dispatch(createBootcamp(data));
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<h1 className="mb-2">{bootcampId ? "Update" : "Add"} Bootcamp</h1>
			<p>Important: You must be affiliated with a bootcamp to add to Guide</p>
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={handleSubmit(SubmitBoocamp)}>
					<Row>
						<Col md={6}>
							<Card className="bg-white py-2 px-4">
								<Card.Body>
									<h3>Location & Contact</h3>
									<p className="text-muted">
										If multiple locations, use the main or largest
									</p>
									<Form.Group>
										<Form.Label>Name</Form.Label>
										<Form.Control
											placeholder="Bootcamp Name"
											isInvalid={!!errors.name}
											isValid={!errors.name && dirtyFields.name}
											{...register("name", {
												required: "Name is required",
											})}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.name?.message}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group>
										<Form.Label>Address</Form.Label>
										<Form.Control
											placeholder="Address"
											isInvalid={!!errors.address}
											isValid={!errors.address && dirtyFields.address}
											{...register("address", {
												required: "Address is required",
											})}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.address?.message}
										</Form.Control.Feedback>
										<Form.Text className="text-muted">
											Street, city, state, etc
										</Form.Text>
									</Form.Group>
									<Form.Group>
										<Form.Label>Phone Number</Form.Label>
										<Form.Control
											placeholder="Phone"
											isInvalid={!!errors.phone}
											isValid={!errors.phone && dirtyFields.phone}
											{...register("phone", {
												required: "phone is required",
											})}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.phone?.message}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group>
										<Form.Label>Email</Form.Label>
										<Form.Control
											placeholder="Email"
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
										<Form.Label>Website</Form.Label>
										<Form.Control
											isInvalid={!!errors.website}
											isValid={!errors.website && dirtyFields.website}
											{...register("website")}
										></Form.Control>
										<Form.Control.Feedback type="invalid">
											{errors.website?.message}
										</Form.Control.Feedback>
									</Form.Group>
								</Card.Body>
							</Card>
						</Col>
						<Col md={6}>
							<Card className="bg-white py-2 px-4">
								<Card.Body>
									<h3>Other Info</h3>
									<Form.Group>
										<Form.Label>Description</Form.Label>
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
									<Form.Group>
										<Form.Label>Careers</Form.Label>
										<Form.Control as="select" {...register("careers")} multiple>
											<option disabled>Select all that apply</option>
											<option value="Web Development">Web Development</option>
											<option value="Mobile Development">
												Mobile Development
											</option>
											<option value="UI/UX">UI/UX</option>
											<option value="Data Science">Data Science</option>
											<option value="Business">Business</option>
											<option value="Other">Other</option>
										</Form.Control>
									</Form.Group>
									<Form.Check>
										<Form.Check.Input
											type="checkbox"
											{...register("housing")}
											id="housing"
										/>
										<Form.Check.Label htmlFor="housing">
											Housing
										</Form.Check.Label>
									</Form.Check>
									<Form.Check>
										<Form.Check.Input
											type="checkbox"
											{...register("jobAssistance")}
											id="jobAssistance"
										/>
										<Form.Check.Label htmlFor="jobAssistance">
											Job Assistance
										</Form.Check.Label>
									</Form.Check>
									<Form.Check>
										<Form.Check.Input
											type="checkbox"
											{...register("jobGuarantee")}
											id="jobGuarantee"
										/>
										<Form.Check.Label htmlFor="jobGuarantee">
											Job Guarantee
										</Form.Check.Label>
									</Form.Check>
									<Form.Check>
										<Form.Check.Input
											type="checkbox"
											{...register("acceptGi")}
											id="acceptGi"
										/>
										<Form.Check.Label htmlFor="acceptGi">
											Accepts GI Bill
										</Form.Check.Label>
									</Form.Check>
									<p className="text-muted my-4">
										*After you add the bootcamp, you can add the specific
										courses offered
									</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
					{updateLoading || (createLoading && <Loader />)}
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
					{updateSuccess && (
						<Alert variant="success" dismissible>
							Bootcamp Updated
						</Alert>
					)}
					{createSuccess && (
						<Alert variant="success" dismissible>
							Bootcamp Created
						</Alert>
					)}
					<Form.Group>
						<Form.Control
							type="submit"
							value="Submit Bootcamp"
							disabled={isSubmitting || !isValid}
							className="btn btn-success btn-block my-4"
						/>
						<Link
							to="/manage-bootcamp"
							className="btn btn-danger btn-block mb-4"
						>
							Cancel
						</Link>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default BootcampFormScreen;
