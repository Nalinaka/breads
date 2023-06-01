const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// SHOW
breads.get('/:arrayIndex', (req, res) => {
    res.send(Bread[req.params.arrayIndex])
  })
  
// INDEX - render means "show this"
breads.get('/', (req, res) => {
    res.render('Index',
      {
        breads: Bread,
        title: 'Index Page'
      }
    )
})

  // res.send(Bread)

module.exports = breads
