import {createStore} from 'redux';
import rootReducer from "./Reducers";

const Store = createStore(rootReducer);

export default Store;
