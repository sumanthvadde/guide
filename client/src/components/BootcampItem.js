import { Link } from "react-router-dom";
import { Col, Row, Card, Badge } from "react-bootstrap";

const BootcampItem = ({ bootcamp }) => {
	const { id, name, averageRating, location, careers } = bootcamp;

	return (
		<Card key={id} className="mb-3">
			<Row className="no-gutters">
				<Col className="md-4">
					<Card.Img src="img/image_1.jpg" alt={name} />
				</Col>
				<Col md={8}>
					<Card.Body>
						<Card.Title>
							<Link to={`/bootcamp/${id}`}>
								{name}
								<Badge pill className="float-right badge-success">
									{parseInt(averageRating)}
								</Badge>
							</Link>
						</Card.Title>
						<Badge pill className="badge-dark mb-2">
							{location.city}, {location.country}
						</Badge>
						<Card.Text>
							{careers?.map((c, i) => (
								<span key={i}>
									{c}
									{i < careers.length - 1 && ", "}
								</span>
							))}
						</Card.Text>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
};

export default BootcampItem;
