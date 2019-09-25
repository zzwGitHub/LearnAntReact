import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

// const delay = (millisecond) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, millisecond);
//   });
// };

export default {
  namespace: 'booktable',
  state: {
    data: []
  },
  effects: {
    *addBook({payload}, sagaEffects) {
      console.log(payload);
      const { call, put } = sagaEffects;
      const endPointURI = `/BootServer/book/add?name=${payload.name}&author=${payload.author}&price=${payload.price}`;
      const addRes = yield call(request, endPointURI);
      // yield put({ type: 'addBookRes', payload: addRes });

    //   yield call(delay, 3000);

    //   const puzzle2 = yield call(request, endPointURI);
    //   yield put({ type: 'addNewCard', payload: puzzle2 });
    },
    *initBooks(_, sagaEffects) {
        const { call, put } = sagaEffects;
        const endPointURI = '/BootServer/book/list';
        const books = yield call(request, endPointURI);
        yield put({ type: 'initTable', payload: books });
    }
  },
  reducers: {
    initTable(state, { payload: books }){
        return {
            data: books,
        };
    },
    // addBookRes(state, { payload: addRes }) {
    //   console.log(addRes);
    //   return {
    //   };
    // }
  },
};