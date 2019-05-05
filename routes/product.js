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
    console.log(file.fieldname)
    callback(null, file.fieldname);
  }
})
const upload = multer({ storage })

router.get('/', (req, res) => {
  Product.find({}, (err, data) => {
    if (err) {
      res.send(500)
    }
    res.send(data)
  })
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
      res.send(200)
    })
    .catch(err => {
      console.log(err)
      res.send(500)
    })
})

router.post('/:id', upload.any(), (req, res) => {
  const { name, variants } = req.body
  const { id } = req.params

  Product.findByIdAndUpdate(id, { name, variants: JSON.parse(variants) }, err => {
    if (err) {
      res.send(500)
    }
    console.log('data berhasil diupdate')
    res.send(200)
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  Product.findByIdAndDelete(id, err => {
    if (err) {
      res.send(500)
    }
    console.log('data berhasil dihapus')
    res.send(200)
  })
})

// new Product({
//   name: 'Contoh Produk'
// }).save().then(() => {
//   console.log('data berhasil diinput')
// })

module.exports = router
