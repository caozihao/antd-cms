import * as usersService from '../services/users';
import { PAGE_SIZE } from "../constants";

// dva将action和reducer封装到model当中
export default {
  //全局 state 上的 key
  namespace: 'users', //相当于redux中的state
  //是初始值，在这里是空数组
  state: {
    list: [],
    totalPage: null,
    curPage: null,
    pageSize: null
  },
  //以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
  reducers: {
    //处理非异步操作，保存到state
    save(state, { payload: { data: list, totalPage, curPage ,pageSize} }) {
      return { ...state, list, totalPage, curPage ,pageSize};
    }

  },
  //以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，
  // 不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，
  // 可以获取全局 state 的数据等等。
  effects: {
    // 处理异步请求
    // 1,saga 的作用最主要还是解决复杂的异步交互情况，特别是竞争状态。
    // 2,saga 是通用方案，不管是简单还是复杂，有些业务看起来简单，但说不定有一个点的异步逻辑比较复杂呢。竞争状态是其中的一个场景，我觉得他最重要的点是可以统一管理业务代码，并且只需要接收一个 action 来触发。
    *fetch({ payload: { pg = 1 ,pg_size = PAGE_SIZE } }, { call, put }) {

      console.log("pg-------->",pg);
      console.log("pg_size-------->",pg_size);

      const { data, headers } = yield call(usersService.fetch,pg ,pg_size);
      yield put({
        type: 'save',
        payload: {
          data,
          totalPage: parseInt(headers['x-total-count'], 10),
          curPage: parseInt(pg, 10),
          pageSize:parseInt(pg_size)
        }
      });

    },
    *remove({ payload: id }, { call, put }) {
      //put:作用和 redux 中的 dispatch 相同。
      //call:有阻塞地调用 saga 或者返回 promise 的函数。
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    //编辑
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    //创建
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    //重新加载
    *reload(action, { put, select }) {
      // 2、select  作用和 redux thunk 中的 getState 相同。
      const [curPage,pageSize] = yield select(state => [state.users.curPage,state.users.pageSize]);

      const query = {
        pg:curPage,
        pg_size:pageSize
      };

      yield put({ type: 'fetch', payload: query });
    }
  },
  // 以 key/value 格式定义 subscription。subscription 是订阅，用于订阅一个数据源，
  // 然后根据需要 dispatch 相应的 action。在 app.start() 时被执行，
  // 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

  subscriptions: {
    // 监听 history 变化，当进入 `/users` 时触发 `fetch` action
    setup({ dispatch, history }) {

      return history.listen(({ pathname, query }) => {
        console.log("query---------->",query);

        if (pathname === '/users' || pathname === '/' ) {
            dispatch({ type: 'fetch', payload: query });
        }

      });

    }
  }
};
