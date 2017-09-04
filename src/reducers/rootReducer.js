import { combineReducers } from 'redux';
import stock from '../modules/stock/stock.reducer';

const rootReducer = combineReducers({
	stock
});

export default rootReducer;
