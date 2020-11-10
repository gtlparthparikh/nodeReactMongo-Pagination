const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 3001
const app = express()
const api = require('./routes/api')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname+'/assests/img'))
app.use('/api',api)
app.listen(port , function(){
    console.log('server running on localhost:' + port )
})