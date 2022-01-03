const associations = require("../associations.json")

const verifyAssociation = (req, res, next) => {
  const { name } = req.params
  const association = associations.find(association => association.name === name)

  if (association) {
    req.association = association
    next()
  } else {
    res.status(404).send("Not found")
  }
}

module.exports = {
  verifyAssociation
}
