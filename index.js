const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/product')
const app = express()

mongoose.connect(
  'mongodb+srv://alven:123asd@cluster0-xrmhu.mongodb.net/e-commerce',
  { useNewUrlParser: true },
  () => {
    console.log('terhubung ke mongodb')
  }
)

app.use('/products', productRoutes)

app.listen(8000)
