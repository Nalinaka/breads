const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// NEW
breads.get('/new', (req, res) => {
    res.render('new')
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id) 
    .then(foundBread => { 
      res.render('edit', {
        bread: foundBread 
      })
    })  
})


  // BEFORE MONGOOSE CODE ADDED
  // bread: Bread[req.params.indexArray],
  //  index: req.params.indexArray


breads.get('/', (req, res) => {
  Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})


// SHOW
// breads.get('/', (req, res) => {
//     //res.send(Bread)
//     res.render('Index', {
//       breads: Bread
//   })
//   })


  
// INDEX - render means "show this"

// EDIT
// breads.get('/:arrayIndex', (req, res) => {
//     if (Bread[req.params.arrayIndex]) {
//       res.render('Show', {
//         bread:Bread[req.params.arrayIndex],
//         index: req.params.arrayIndex,
//       })
//     } else {
//       res.send('404')
//     }
//   })


breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      }).catch(err => {
        res.send('404')
      })
})



// CREATE
breads.post('/', express.urlencoded({ extended: true }), 
    (req, res) => {
   //   console.log(undefined)
  if (!req.body.image) {
    req.body.image = undefined
  }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = 'true'
    } else {
      req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })

  // UPDATE
  breads.put('/:id', 
express.urlencoded({ extended: true }),
 (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
      })
  })
  

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})
  
  // res.send(Bread)
module.exports = breads
