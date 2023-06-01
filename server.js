// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//middleware
  const breadsController = require('./controllers/breads_controller.js')
  app.use('/breads', breadsController)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jsx')
  app.engine('jsx', require('express-react-views').createEngine())


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
  })
  
// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
