const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const slugify = require('slugify')
const uniqid = require('uniqid')

router.get('/', (req, res) => {
  res.send('halaman produk')
})

router.post('/', (req, res) => {
  res.send(req.body)

  const { name, variants } = req.body

  new Product({
    name,
    slug: uniqid(`${slugify(name.toLowerCase())}-`),
    variants: JSON.parse(variants),
  }).save().then(() => {
    console.log('data berhasil disimpan ke database')
  })
})

// new Product({
//   name: 'Contoh Produk'
// }).save().then(() => {
//   console.log('data berhasil diinput')
// })

module.exports = router
