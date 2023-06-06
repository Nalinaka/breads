// DEPENDENCIES
const express = require('express')
const app = express()
const methodOverride = require('method-override')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//middleware
  const breadsController = require('./controllers/breads_controller.js')
  app.use('/breads', breadsController)
  app.use(express.urlencoded({extended: true}))
  app.use(methodOverride('_method'))
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jsx')
  app.engine('jsx', require('express-react-views').createEngine())
  app.use(express.static('public'))

 


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
    // 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })

// CREATE
breads.post('/', (req, res) => {
  console.log(req.body)
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.push(req.body)
  res.redirect('/breads')
})

  })
  
// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
