import Responder from '../../server/expressResponder'

export default function sendResponse (serviceResult, res) {
  if (serviceResult.successful) {
    Responder.success(res, serviceResult.result)
  } else {
    Responder.operationFailed(res, serviceResult.errors)
  }
}
