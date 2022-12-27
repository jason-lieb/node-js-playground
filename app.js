const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/about.html', (req, res) => {
  res.sendFile(__dirname + '/about.html');
})

app.get('/contact-me.html', (req, res) => {
  res.sendFile(__dirname + '/contact-me.html');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})