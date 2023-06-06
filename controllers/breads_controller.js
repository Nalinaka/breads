const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// NEW
breads.get('/new', (req, res) => {
    res.render('new')
})


// SHOW
breads.get('/', (req, res) => {
    //res.send(Bread)
    res.render('Index', {
      breads: Bread
  })
  })
  
// INDEX - render means "show this"
// SHOW
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
      res.render('Show', {
        bread:Bread[req.params.arrayIndex],
        index: req.params.arrayIndex,
      })
    } else {
      res.send('404')
    }
  })

// CREATE
breads.post('/', express.urlencoded({ extended: true }), (req, res) => {
  if (!req.body.image) {
    req.body.image = 
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=400&q=80'
  }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = 'true'
    } else {
      req.body.hasGluten = 'false'
    }
    Bread.push(req.body)
    res.redirect('/breads')
  })

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

  
  // res.send(Bread)
module.exports = breads
