const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
const breadSeedData = require('../models/seed.js')

// in the new route
breads.get('/new', (req, res) => {
  Baker.find()
      .then(foundBakers => {
          res.render('new', {
              bakers: foundBakers
          })
    })
})


// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})

// INDEX - render means "show this"
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find();
  const foundBreads = await Bread.find().limit(5).lean()
  console.log(foundBreads, "Yay!!")
          res.render('index', {
          breads: foundBreads,
          bakers: foundBakers,
          title: 'Index Page'
          });
      });

   // .then(foundBakers => {
   //   .then(foundBreads => {

//EDIT old code replaced by above code 
// breads.get('/', (req, res) => {
//   Bread.find()
//       .then(foundBreads => {
//           res.render('index', {
//               breads: foundBreads,
//               title: 'Index Page'
//           })
//       })
// })


  // BEFORE MONGOOSE CODE ADDED
  // bread: Bread[req.params.indexArray],
  //  index: req.params.indexArray


// SHOW
// breads.get('/', (req, res) => {
//     //res.send(Bread)
//     res.render('Index', {
//       breads: Bread
//   })
//   })


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

//
// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy() 
        console.log(bakedBy)
        res.render('show', {
            bread: foundBread
        })
      }).catch(err => {
        res.send('<h1>404: This is not a page you should be on')
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

// SEED ROUTE 
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(breadSeedData)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})
  
  // res.send(Bread)
module.exports = breads



