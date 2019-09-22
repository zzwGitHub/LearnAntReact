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
    *queryInitBooks(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = '/BootServer/test/tableData';
      const puzzle = yield call(request, endPointURI);
      yield put({ type: 'addNewCard', payload: puzzle });

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
    // addNewCard(state, { payload: newCard }) {
    //   const nextCounter = state.counter + 1;
    //   const newCardWithId = { ...newCard, id: nextCounter };
    //   const nextData = state.data.concat(newCardWithId);
    //   return {
    //     data: nextData,
    //     counter: nextCounter,
    //   };
    // }
  },
};