import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { KSL_TRAFFIC_URL } from '../../constants/api';
import { extractTrafficReport } from './helper';


export function retrieveTrafficReportSuccess(report) {
	return {
		type: types.RETRIEVE_TRAFFIC_REPORT_SUCCESS,
		report
	};
}

export function retrieveTrafficReport() {
	return function (dispatch) {
		return axios.get(KSL_TRAFFIC_URL)
		.then(res => {
			let action = retrieveTrafficReportSuccess(extractTrafficReport(res.data));
			dispatch(action);
		})
		.catch(error => {
			console.error(error); //eslint-disable-line
		});
	};
}
