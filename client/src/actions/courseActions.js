import axios from "axios";
import {
	MY_COURSE_LIST_REQUEST,
	MY_COURSE_LIST_SUCCESS,
	MY_COURSE_LIST_FAIL,
	MY_COURSE_DELETE_SUCCESS,
	MY_COURSE_DELETE_REQUEST,
	MY_COURSE_DELETE_FAIL,
	MY_COURSE_CREATE_REQUEST,
	MY_COURSE_CREATE_SUCCESS,
	MY_COURSE_CREATE_FAIL,
	MY_COURSE_UPDATE_REQUEST,
	MY_COURSE_UPDATE_SUCCESS,
	MY_COURSE_UPDATE_FAIL,
	MY_COURSE_DETAILS_REQUEST,
	MY_COURSE_DETAILS_SUCCESS,
	MY_COURSE_DETAILS_FAIL,
} from "../constants/courseConstants";

export const listMyCourses = (bootcampId) => async (dispatch, getState) => {
	try {
		dispatch({ type: MY_COURSE_LIST_REQUEST });

		const {
			data: { data },
		} = await axios.get(`/api/v1/bootcamps/${bootcampId}/courses`);

		dispatch({
			type: MY_COURSE_LIST_SUCCESS,
			payload: { courses: data },
		});
	} catch (error) {
		dispatch({
			type: MY_COURSE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listCourseDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: MY_COURSE_DETAILS_REQUEST });

		const {
			data: { data },
		} = await axios.get(`/api/v1/courses/${id}`);

		dispatch({
			type: MY_COURSE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MY_COURSE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteCourse = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: MY_COURSE_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/v1/courses/${id}`, config);

		dispatch({
			type: MY_COURSE_DELETE_SUCCESS,
			payload: id,
		});
	} catch (error) {
		dispatch({
			type: MY_COURSE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createCourse =
	(bootcampId, course) => async (dispatch, getState) => {
		try {
			dispatch({
				type: MY_COURSE_CREATE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`/api/v1/bootcamps/${bootcampId}/courses`,
				course,
				config
			);

			dispatch({
				type: MY_COURSE_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: MY_COURSE_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
			throw Error(error);
		}
	};

export const updateCourse = (course) => async (dispatch, getState) => {
	try {
		dispatch({
			type: MY_COURSE_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/v1/courses/${course._id}`,
			course,
			config
		);

		dispatch({
			type: MY_COURSE_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MY_COURSE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
