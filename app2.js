const express = require('express')
const app = express()


app.get('/',(req,res)=>{

  res.send('<h1>meshossssssssssssssssss</h1>')
})

app.listen(process.env.PORT|| 5000)
module.exports = app

