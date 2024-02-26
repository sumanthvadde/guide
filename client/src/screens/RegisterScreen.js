import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Card, Alert } from "react-bootstrap";
import { register as registerUser } from "../actions/userActions";
import Loader from "../components/Loader";

const RegisterScreen = ({ history }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, dirtyFields },
		watch,
	} = useForm({
		mode: "onChange",
	});

	const password = useRef({});
	password.current = watch("password", "");

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			history.push("/");
		}
	}, [history, userInfo]);

	const submit = ({ name, email, password, role }) => {
		dispatch(registerUser(name, email, password, role));
	};

	return (
		<Row>
			<Col md={6} className="m-auto">
				<Card className="bg-white p-4 mb-4">
					<Card.Body>
						<h1>
							<i className="fas fa-user-plus"></i> Register
						</h1>
						{loading && <Loader />}
						{error && (
							<Alert variant="danger" dismissible>
								{error}
							</Alert>
						)}
						<p>
							Register to list your bootcamp or rate, review and favorite
							bootcamps
						</p>
						<Form onSubmit={handleSubmit(submit)}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									placeholder="Enter name"
									isInvalid={!!errors.name}
									isValid={!errors.name && dirtyFields.name}
									{...register("name", {
										required: "Name is required",
									})}
								></Form.Control>
								<Form.Control.Feedback type="invalid">
									{errors.name?.message}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									placeholder="Enter email"
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
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter password"
									isInvalid={!!errors.password}
									isValid={!errors.password && dirtyFields.password}
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message: "Password must have at least 6 characters",
										},
										pattern: {
											message:
												"Please enter a valid password with at least 6 chars",
										},
									})}
								></Form.Control>
								<Form.Control.Feedback type="invalid">
									{errors.password?.message}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-4">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									isInvalid={!!errors.confirmPassword}
									isValid={
										!errors.confirmPassword && dirtyFields.confirmPassword
									}
									placeholder="Confirm password"
									{...register("confirmPassword", {
										required: "Confirm Password is required",
										validate: {
											value: (value) =>
												value === password.current ||
												"The passwords do not match",
										},
									})}
								></Form.Control>
								<Form.Control.Feedback type="invalid">
									{errors.confirmPassword?.message}
								</Form.Control.Feedback>
							</Form.Group>
							<Card.Body className="mb-3">
								<h5>User Role</h5>
								<Form.Check>
									<Form.Check.Input
										type="radio"
										value="user"
										{...register("role", { required: true })}
										checked
									/>
									<Form.Check.Label>
										Regular User (Browse, Write reviews, etc)
									</Form.Check.Label>
								</Form.Check>
								<Form.Check>
									<Form.Check.Input
										type="radio"
										value="publisher"
										{...register("role", { required: true })}
									/>
									<Form.Check.Label>Bootcamp Publisher</Form.Check.Label>
								</Form.Check>
							</Card.Body>
							<p className="text-danger">
								* You must be affiliated with the bootcamp in some way in order
								to add it to Guide.
							</p>
							<Form.Group>
								<Form.Control
									type="submit"
									disabled={!isValid || isSubmitting}
									value={loading ? "Loading..." : "Register"}
									className="btn btn-primary btn-block"
								/>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default RegisterScreen;
