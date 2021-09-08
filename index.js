const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use (express.static (__dirname + '/dist'));

// app.get('/', (req, res) => {
//   res.send('api panorama3d ')
// })

app.listen(port, () => {
  console.log(`Port: ${port}`)
})