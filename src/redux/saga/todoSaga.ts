
import { call, put, takeEvery } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import qs from "qs"

function* handleGetTodoRequest(payload: any): Generator<any, void, Response> {
    try {
        const params = qs.stringify(payload.payload)
        const response: Response = yield call(fetch, `api/todo?${params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const jsonData: any = yield call([response, 'json']);
        yield put({ type: "Todo/handleGetTodoResponse", payload: jsonData });
    } catch (err: any) {
        toast.error(`${err.message} - api/todo`);
    }
}

export function* todoSaga(): Generator<any> {
    yield takeEvery('Todo/handleGetTodoRequest', handleGetTodoRequest);
}
