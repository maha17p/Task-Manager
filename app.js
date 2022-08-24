const express = require('express');
const tasks = require('./routes/tasks')
const connctDB = require('./db/connect')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000; 
const noFound = require('./middleware/noFound')
const errorHandler = require('./middleware/errorHandler')

app.use(express.static('./public'))
app.use(express.json())


// Routes
app.use('/api/v1/tasks', tasks);

app.use(noFound)

app.use(errorHandler)


const start = async() => {
    try{
        await connctDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server listening port number ${port}`))
    }
    catch(error){
        console.log(error);
    }
}

start()
