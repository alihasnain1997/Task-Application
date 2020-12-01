const express = require('express');
require('./db/mongoose')
const auth = require('./middelware/auth')

const app = express()

const userRoutes = require('./routes/userRoute')
const taskRoutes = require('./routes/tasksRoute')
const authRoutes = require('./routes/authRoute')

const port = process.env.PORT

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/users', auth, userRoutes)
app.use('/tasks', auth, taskRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




// const Task = require('./models/task');
// const User = require('./models/user');

// const myFun = async function () {
//   // const task = await Task.findById('5fbf59695be2d53a8475048d')
//   // await task.populate('owner').execPopulate()
//   // console.log(task)
//   const user = await User.findById('5fbf40f792b9b14104500586');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// }
// myFun()