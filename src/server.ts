import express from 'express'
import payload from 'payload'
import path from 'path';

require('dotenv').config()
const app = express()
const PORT = 3000
//Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.use('/assets', express.static(path.resolve(__dirname, './assets')));

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()} on port ${PORT}`)
    },
  })

  // Add your own express routes here

  app.listen(PORT)
}

start()
