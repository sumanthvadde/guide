import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<i className="fas fa-laptop-code"></i> Guide
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{userInfo ? (
								<NavDropdown title={userInfo.name}>
									{userInfo.role === "publisher" && (
										<LinkContainer to="/manage-bootcamp">
											<NavDropdown.Item>Manage Bootcamp</NavDropdown.Item>
										</LinkContainer>
									)}
									{userInfo.role === "user" && (
										<LinkContainer to="/manage-reviews">
											<NavDropdown.Item>Manage Reviews</NavDropdown.Item>
										</LinkContainer>
									)}
									{userInfo.role === "admin" && (
										<LinkContainer to="/manage-reviews">
											<NavDropdown.Item>Manage Reviews</NavDropdown.Item>
										</LinkContainer>
									)}
									<LinkContainer to="/manage-account">
										<NavDropdown.Item>Manage Account</NavDropdown.Item>
									</LinkContainer>

									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<>
									<LinkContainer to="/login">
										<Nav.Link>
											<i className="fas fa-sign-in-alt"></i> Login
										</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/register">
										<Nav.Link>
											<i className="fas fa-user-plus"></i> Register
										</Nav.Link>
									</LinkContainer>
								</>
							)}
							{/* <Nav.>|</Nav.> */}
							<LinkContainer to="/bootcamps">
								<Nav.Link>Browse Bootcamps</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
