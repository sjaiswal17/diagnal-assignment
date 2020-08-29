import apiRoutes from './api'

const initRoutes = app => {
  app.get('/health-check', (req, res) => {
    res.sendStatus(200)
  })

  app.use(apiRoutes)
}

export default initRoutes
