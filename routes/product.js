const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('', (req, res) => {
  res.send('halaman produk')
})

// new Product({
//   name: 'Contoh Produk'
// }).save().then(() => {
//   console.log('data berhasil diinput')
// })

module.exports = router
