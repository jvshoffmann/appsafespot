const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const client = require('./config/database');
const bcrypt = require('bcrypt');


/*const cors = require("cors")
app.use(cors())
/*app.get("/", function(req, res) {
  res.send("It's working!")
})*/
/*app.get("/", function(req, res) {
    res.send({"name": "Jane Doe"}) // Should be json format
  })

app.listen(3000, () => {
  console.log("app listening on port 3000")
})*/


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, hashedPassword]);
    res.json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Erro ao registrar.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});