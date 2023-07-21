require('dotenv').config()
const express = require('express');
const userRoutes = require('./routes/userRoutes')
const port = process.env.PORT || 5000;
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const dbconnection = require('./config/db')
const cookie_parser = require('cookie-parser')


const app = express();

dbconnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie_parser())

// IMPORTANT NOTE: THE ABOVE CODE MUST ALWAYS APPEAR BEFORE THE ROUTE
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log('server started'));