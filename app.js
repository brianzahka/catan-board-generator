const express = require('express')
const app = express()
const port = 3000
app.use(express.static('js'))
app.use(express.static('css'))
app.use(express.static('images'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})