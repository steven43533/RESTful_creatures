const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req,res) => {
    
    let RESTful_creatures = fs.readFileSync('./RESTful_creatures.json')
    let creatures = JSON.parse(RESTful_creatures)
    res.render('prehistoric_creatures/index.ejs', {creatures: creatures})
})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})
// SHOW ROUTE
router.get('/:idx', (req, res) => {
    // get dinosaurs array
    let RESTful_creatures = fs.readFileSync('./RESTful_creatures.json')
    let creatures = JSON.parse(RESTful_creatures)

    // get array from URL parameter
    let creaturesIndex = req.params.idx
    
    res.render('prehistoric_creatures/show.ejs', {myCreatures: creatures[creaturesIndex]})
})

// POST A NEW DINO

router.post('/', (req,res) => {
    // get dinosaurs array
    let RESTful_creatures = fs.readFileSync('./RESTful_creatures.json')
    let creatures = JSON.parse(RESTful_creatures)

    // add new dino to dinoData
    creatures.push(req.body)

    // save updated dinoData to JSON
    fs.writeFileSync('./RESTful_creatures.json', JSON.stringify(creatures))

    // redirect to GET /dinosaurs (index)
    res.redirect('/prehistoric-creatures')
})

router.delete('/:idx', (req,res) => {
    // get dinosaurs array
    let RESTful_creatures = fs.readFileSync('./RESTful_creatures.json')
    let creatures = JSON.parse(RESTful_creatures)

    // remove the deleted dinosaur from the dino array
    creatures.splice(req.params.idx, 1)

    // save the new dinosaurs to the json file
    fs.writeFileSync('./RESTful_creatures.json', JSON.stringify(creatures))

    res.redirect('/prehistoric-creatures')
})

module.exports = router