const Sequelize = require('sequelize')
const db = require('../db/connection')

const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.REAL,
    },
    company: {
        type: Sequelize.STRING,
    },
    mail: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Job