require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/product')
const app = express()

mongoose.connect(
  process.env.DB_CLUSTER_URL,
  { useNewUrlParser: true },
  () => {
    console.log('terhubung ke mongodb')
  }
)

app.use('/products', productRoutes)

app.listen(8000)
