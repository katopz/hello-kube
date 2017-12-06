class Server {
  private _baseURL = null
  public _app = null
  private _server = null

  _initApp() {
    // Express
    const express = require('express')
    const app = express()

    // CORS
    const cors = require('cors')
    app.use(cors())

    // Helmet
    const helmet = require('helmet')
    app.use(helmet())

    // JSON
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    // Static
    app.use(express.static('public'))

    return app
  }

  constructor(baseURL: string) {
    this._baseURL = baseURL
    this._app = this._initApp()
  }

  get app() {
    return this._app
  }

  start() {
    return new Promise((resolve, reject) => {
      // Graceful Shutdown Server
      const gracefulShutdown = (server, signal) => {
        console.info(`Received kill signal (${signal}), shutting down gracefully.`)
        server.close(() => {
          console.info('Closed out remaining connections.')
          process.exit()
        })
      }

      // Server
      const { URL } = require('url')
      const port = new URL(this._baseURL).port

      // Dispose old one
      if (this._server) this._server.close()

      // New server
      this._server = this._app.listen(port, err => {
        if (err) return reject(err)
        console.info(`Server   : ${this._baseURL}`)
        resolve(this._server)
      })

      // Graceful server shutdown
      // listen for TERM signal .e.g. kill
      process.on('SIGTERM', () => {
        gracefulShutdown(this._server, 'SIGTERM')
      })

      // listen for TERM siganal .e.g. Ctrl-C
      process.on('SIGINT', () => {
        gracefulShutdown(this._server, 'SIGINT')
      })
    })
  }

  stop() {
    if (!this._server) return Promise.resolve(false)

    return new Promise((resolve, reject) => {
      console.info(`Server   : closing...`)
      this._server.close(() => {
        console.info(`Server   : bye!`)
        resolve(true)
      })
      this._server = null
    })
  }
}

export default Server
