// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/events',
      name: 'eventsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/EventsPage/reducer'),
          System.import('containers/EventsPage/sagas'),
          System.import('containers/EventsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('eventsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/login',
      name: 'logInPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/LogInPage/reducer'),
          System.import('containers/LogInPage/sagas'),
          System.import('containers/LogInPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('logInPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/documents',
      name: 'documentsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/DocumentsPage/reducer'),
          System.import('containers/DocumentsPage/sagas'),
          System.import('containers/DocumentsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('documentsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/profiles',
      name: 'profilesPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ProfilesPage/reducer'),
          System.import('containers/ProfilesPage/sagas'),
          System.import('containers/ProfilesPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profilesPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/timeline',
      name: 'timelinePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/TimelinePage/reducer'),
          System.import('containers/TimelinePage/sagas'),
          System.import('containers/TimelinePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('timelinePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
