// DEPENDENCIES
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the World of Bread!')
})

mongoose.connect(process.env.MONGO_URI, 
  {useNewUrlParser: true, useUnifiedTopology: true}, () =>  {
   console.log('connected to mongoDB: ', process.env.MONGO_URI)
  })
  

//middleware

app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// BREAD
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// BAKERs
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)


    // 404 Page   
    app.get('*', (req, res) => {
        res.send('404')
      })
    
    // LISTEN
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    })
