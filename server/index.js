const express = require('express');
const pool = require('./../db/index.js');
const app = express()
const axios = require('axios')

app.use(express.static('./react-client/dist'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/items/:item_id', express.static('react-client/dist'));

app.get('/items/:item_id/seller', (req, res) => {
  let item_id = req.params.item_id;
  let query = 'SELECT * FROM seller_info WHERE item_id = $1';
  let args = [item_id]
  pool.query(query, args, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/shopping/items', (req, res) => {
  axios.get('http://localhost:3004/shopping/items').then(function(response) {
    console.log(response.data)
    res.send(response.data)
  })
})

module.exports = app;
