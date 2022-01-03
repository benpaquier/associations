const express = require("express")
const app = express()

const associations = require("../associations.json")
const { verifyAssociation } = require("../middlewares/associations")
// `/associations`
// => ['resto du coeur, 'unicef', 'konexio']

app.get('/', (req, res) => {
  const associationsNames = associations.map(association => association.name)

  res.json(associationsNames)
})

app.get('/:name', verifyAssociation, (req, res) => {
  res.json(req.association)
})

module.exports = app