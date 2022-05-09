const express = require('express');
const app = express()
const db = require('./db/connection')
const Job = require('./models/Job')
const bodyParser = require('body-parser')

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Application running on port ${PORT}`)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

db.authenticate()
    .then(()=>{
        console.log('Database connected successfuly!')
    })
    .catch(err => {
        console.log('Something went wrong while connecting database!')
    }) 

app.use('/jobs', require('./routes/jobs'))
