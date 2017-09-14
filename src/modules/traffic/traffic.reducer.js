import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.traffic, action) {
	switch (action.type) {

		case types.RETRIEVE_TRAFFIC_REPORT_SUCCESS:
			return {
				...state,
				report: action.report
			};


		default:
			return state;
	}
}
