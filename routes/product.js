const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const slugify = require('slugify')
const uniqid = require('uniqid')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img/products');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
})
const upload = multer({ storage })

router.get('/', (req, res) => {
  res.send('halaman produk')
})

router.post('/', upload.any(), (req, res) => {
  const { name, variants } = req.body

  new Product({
    name,
    slug: uniqid(`${slugify(name.toLowerCase())}-`),
    variants: JSON.parse(variants),
  }).save()
    .then(() => {
      console.log('data berhasil disimpan ke database')
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

// new Product({
//   name: 'Contoh Produk'
// }).save().then(() => {
//   console.log('data berhasil diinput')
// })

module.exports = router
