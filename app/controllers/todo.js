import sendResponse from '../helpers/sendResponse'
import GetAll from '../services/todo/getAll'

export default class ToDoController {
  static async GetAll (req, res) {
    const getAllResult = await GetAll.execute(req.body)
    sendResponse(getAllResult, res)
  }
}
