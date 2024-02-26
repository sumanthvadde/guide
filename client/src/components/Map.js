import { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
	"pk.eyJ1IjoiYWhyb25sdSIsImEiOiJja252ZWlsbzQwbHMyMm9xbm13MW1ocGRnIn0.1BnCQuHouHX6y0_kBmpcgQ";
const Map = ({ lat, lng, name }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map?.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat],
			zoom: 9,
		});
	});

	return (
		<div
			ref={mapContainer}
			style={{
				height: "100%",
				overflow: "hidden",
			}}
		></div>
	);
};

export default Map;
