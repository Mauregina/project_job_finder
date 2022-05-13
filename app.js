const express = require('express');
const exphbs = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Application running on port ${PORT}`)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// handle bars
app.set('views', path.join(__dirname, 'views')) // location of the templates of the project
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})) // main layout file application
app.set('view engine', 'handlebars') // framework we will use to render the views

// static folder
app.use(express.static(path.join(__dirname, 'public')))

db.authenticate()
    .then(()=>{
        console.log('Database connected successfuly!')
    })
    .catch(err => {
        console.log('Something went wrong while connecting database!')
    }) 

app.use('/jobs', require('./routes/jobs'))

app.get('/', (req, res) => {

    let search = req.query.job //parameter received from frontend where job is the name of the input    
    let query = '%' + search + '%'

    if (search) {
        Job.findAll({
            where: {
                title: {
                    [Op.like]: query
                }
            },
            order: [
                ['description']
            ]
        })
        .then(jobs => {
            res.render('index', {jobs, search})
        })
        .catch(err => console.log(err))  
    } else {
        Job.findAll({
            order: [
                [Sequelize.literal('createdAt, description')]
            ]
        })
        .then(jobs => {
            res.render('index', {jobs})
        })
        .catch(err => console.log(err))
    }
})
