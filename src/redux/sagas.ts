
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { todoSaga } from './saga/todoSaga'


export default function* rootSaga() {
    yield all([
        todoSaga()
    ])
}