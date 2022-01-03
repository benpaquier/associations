const express = require("express")
const app = express()
const moment = require("moment")
const fs = require("fs")

const path = "./messages.json"
// const messages = require('../messages.json')

app.get('/', (req, res) => {
  // pour etre sur d'avoir les messages a jour,
  // je fais un readFile a chaque requete sur 
  // cette route

  fs.readFile(path, (err, data) => {
    if (err) {
      res.status(500).send("Internal server error")
    }

    const messages = JSON.parse(data)
    res.json(messages)
  })
})

app.post('/', (req, res) => {
  const message = {
    ...req.body,
    date: moment().format()
  }

  // on utilise readfile pour avoir acces 
  // a tous nos messages de facon persistante
  // comme si on utilisait une base de donnée
  // ca veut dire que si j'eteins mon serveur, 
  // mon fichier json sera toujours à jour
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log("error", err)
      // l'erreur arrive coté serveur (typiquement, mauvais chemin de fichier)
      // on renvoie un status 500
      res.status(500).send("Internal server error")
    }

    // je décode le contenu de mon fichier
    let messages = JSON.parse(data)
    // j'ajoute un message a mon tableau de messages
    messages = [ ...messages, message ]

    // j'ecris dans mon fichier (litéralement)
    // en utilisant JSON.stringify pour réencoder mes messages
    fs.writeFile(path, JSON.stringify(messages), (err) => {
      if (err) {
        res.status(500).send("Internal server error")
      }
    })
  })

  res.json(message)
})

module.exports = app