import axios from "axios";
import {
	REVIEW_LIST_REQUEST,
	REVIEW_LIST_SUCCESS,
	REVIEW_LIST_FAIL,
	REVIEW_DETAILS_REQUEST,
	REVIEW_DETAILS_SUCCESS,
	REVIEW_DETAILS_FAIL,
	REVIEW_DELETE_SUCCESS,
	REVIEW_DELETE_REQUEST,
	REVIEW_DELETE_FAIL,
	REVIEW_CREATE_REQUEST,
	REVIEW_CREATE_SUCCESS,
	REVIEW_CREATE_FAIL,
	REVIEW_UPDATE_REQUEST,
	REVIEW_UPDATE_SUCCESS,
	REVIEW_UPDATE_FAIL,
} from "../constants/reviewConstants";

export const listReviews = (bootcampId) => async (dispatch) => {
	try {
		dispatch({ type: REVIEW_LIST_REQUEST });

		const {
			data: { data },
		} = await axios.get(`/api/v1/reviews`);

		dispatch({
			type: REVIEW_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listBootcampReviews = (bootcampId) => async (dispatch) => {
	try {
		dispatch({ type: REVIEW_LIST_REQUEST });

		const {
			data: { data },
		} = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews`);

		dispatch({
			type: REVIEW_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listReviewDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: REVIEW_DETAILS_REQUEST });

		const {
			data: { data },
		} = await axios.get(`/api/v1/reviews/${id}`);

		dispatch({
			type: REVIEW_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteReview = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: REVIEW_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/v1/reviews/${id}`, config);

		dispatch({
			type: REVIEW_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateReview = (review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: REVIEW_UPDATE_REQUEST,
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
			`/api/v1/reviews/${review._id}`,
			review,
			config
		);

		dispatch({
			type: REVIEW_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createBootcampReview =
	(bootcampId, review) => async (dispatch, getState) => {
		try {
			dispatch({
				type: REVIEW_CREATE_REQUEST,
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

			await axios.post(
				`/api/v1/bootcamps/${bootcampId}/reviews`,
				review,
				config
			);

			dispatch({
				type: REVIEW_CREATE_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: REVIEW_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listMyReviews = () => async (dispatch, getState) => {
	try {
		dispatch({ type: REVIEW_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const {
			data: { data },
		} = await axios.get(`/api/v1/reviews/getmyreviews`, config);

		dispatch({
			type: REVIEW_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REVIEW_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
