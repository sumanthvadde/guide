// import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Alert } from "react-bootstrap";
// import Loader from "../components/Loader.js"
// import { useState } from "react";

const HomeScreen = ({ history }) => {
	// const [counter, setCounter] = useState(0);

	// const { bootcamps, loading, error } = useSelector(
	//   (state) => state.bootcampList
	// );

	// useEffect(() => {
	//   bootcamps.length > 0 && counter && history.push("/bootcamps");
	// }, [bootcamps.length, history]);

	return (
		<div className="showcase ">
			{/* {loading && <Loader/>}
      {error && <Alert variant="danger">{error}</Alert>} */}
			<div className="dark-overlay">
				<div className="showcase-inner">
					<h1 className="display-4">Find a Guide</h1>
					<p className="lead">Find, rate and read reviews on coding guide</p>
					<Link to="/bootcamps" className="btn btn-primary my-3">
						Find Bootcamps
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
