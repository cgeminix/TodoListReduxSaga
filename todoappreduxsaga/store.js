import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './todoReducer';
import todoSaga from './todoSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(todoSaga);

export default store;