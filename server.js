// DEPENDENCIES
const express = require('express')
const app = express()
const methodOverride = require('method-override')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the World of Bread!')
})

//middleware
const breadsController = require('./controllers/breads_controller.js')
app.use(methodOverride('_method'))
app.use('/breads', breadsController)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

    // 404 Page
    
   
    app.get('*', (req, res) => {
        res.send('404')
      })
    
    // LISTEN
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    })
