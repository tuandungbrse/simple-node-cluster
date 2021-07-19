const express = require('express')
const cluster = require('cluster')
const os = require('os')
const exec = require('./fibonacci')

if (cluster.isMaster) {
  const cpus = os.cpus().length

  for (let c = 0; c < cpus; c++) {
    cluster.fork()
  }

  cluster.on('online', (worker) => {
    console.log(
      `Worker ${worker.id} is running on process ${worker.process.pid}`
    )
  })

  cluster.on('exit', (worker) => {
    console.log(
      `Worker ${worker.id} with process ${worker.process.pid} has exited...`
    )
    console.log(`Forking a new one!`)
    cluster.fork()
  })
} else {
  const app = express()

  app.get('/', (req, res) => {
    console.log(
      `Worker ${cluster.worker.id} on process ${cluster.worker.process.pid} has accepted request`
    )
    const value = exec(Number.parseInt(req.query.number))
    res.send(`<h1>${value}</h1>`)
  })

  app.listen(3000, () => {
    console.log('Server is running...')
  })
}
