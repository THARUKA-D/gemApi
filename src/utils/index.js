const applyMiddleware = (middleware, router) => {
  for (const addMiddleware of middleware) {
    addMiddleware(router);
  }
};
const applyRoutes = (routes, router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    router[method](path, handler);
  }
};

module.exports = {
  applyMiddleware,
  applyRoutes,
};
