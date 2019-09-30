import request from '../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

// const delay = (millisecond) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, millisecond);
//   });
// };

export default {
  namespace: 'booktable',
  state: {
    data: [],
    statistics:{},
  },
  effects: {
    *addBook({payload}, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = `/BootServer/book/add?name=${payload.name}&author=${payload.author}&price=${payload.price}`;
      const addRes = yield call(request, endPointURI);
      yield put({ type: 'initBooks', payload: addRes });

    //   yield call(delay, 3000);

    //   const puzzle2 = yield call(request, endPointURI);
    //   yield put({ type: 'addNewCard', payload: puzzle2 });
    },
    *initBooks(_, sagaEffects) {
        const { call, put } = sagaEffects;
        const endPointURI = '/BootServer/book/list';
        const books = yield call(request, endPointURI);
        yield put({ type: 'initTable', payload: books });
    },
    *getStatistic({payload}, { call, put }) {
      const endPointURI = `/BootServer/book/getStatistic`;
      const statistics = yield call(request, endPointURI);
      yield put({ type: 'showStatistic', payload: {data:statistics,  id: payload}});
      return statistics;
    },
  },
  reducers: {
    initTable(state, { payload: books }){
        return {
          ...state,
            data: books,
        };
    },
    showStatistic(state, { payload: {data, id}}){
      return {
        ...state,
        statistics: {
          ...state.statistics,
          [id]: data,
        },
      };
    },
  },
};