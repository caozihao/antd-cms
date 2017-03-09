import React from 'react';
import { Router } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

//按需加载
function RouterConfig({ history, app }) {
  const routes = [
/*    {
      path: '/',
      name: 'IndexPage',  //routes/IndexPage.js
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        });
      }
    },*/
    {
      path: '/',
      name: 'UsersPage', //routes/UserPage.js
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/users'));
          cb(null, require('./routes/Users'));
        });
      }
    },
    {
      path: '/users',
      name: 'UsersPage', //routes/UserPage.js
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/users'));
          cb(null, require('./routes/Users'));
        });
      }
    }
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
