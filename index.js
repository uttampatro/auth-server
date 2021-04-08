//import
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')


//app config
const app = express();
const port = process.env.PORT || 5000;

dotenv.config()

//Middleware
app.use(express.json());


//DB config
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
},
    () => console.log('connected to DB')
)

//Api middleware
app.use('/user', authRoute)


//listener
app.listen(port, () => console.log(`localhost running on ${port}`))