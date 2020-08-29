import Route from 'express/lib/router/route'
import methods from 'methods'

// To detect async functions
const AsyncFunction = (async () => { }).constructor

/**
* Catch all errors in the given async middleware and send forward with next()
* @link https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
* @param {function} aFunc
*/
function asyncMiddleware (aFunc) {
  return (req, res, next) => {
    Promise
      .resolve(aFunc(req, res, next))
      .catch(next)
  }
}

// Convert all async methods to asyncMiddleware
methods.forEach((method) => {
  const origMethod = Route.prototype[method]
  Route.prototype[method] = function (func, ...args) {
    // Convert async functions to async middleware to pass all unhandled errors to next
    if (func instanceof AsyncFunction) func = asyncMiddleware(func)
    origMethod.call(this, func, ...args)
  }
})
