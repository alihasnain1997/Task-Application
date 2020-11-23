const express = require('express');
require('./db/mongoose')



const userRoutes = require('./routes/userRoute')
const taskRoutes = require('./routes/tasksRoute')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})