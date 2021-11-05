const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

// middleware
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body-parser middleware
// makes req.body work
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric-creatures', require('./controllers/prehistoric-creatures.js'))


app.get('/', (req,res) => {
    res.render('home.ejs')
})



app.listen(8000, () => {
    console.log('Dino Time 🦖');
})