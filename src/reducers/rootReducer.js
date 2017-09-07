import { combineReducers } from 'redux';
import traffic from '../modules/traffic/traffic.reducer';

const rootReducer = combineReducers({
	traffic
});

export default rootReducer;
