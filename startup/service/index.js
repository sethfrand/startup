const express = require('express');
const app = express();
const authRouter = require('./routes/auth');


app.use(express.json());
app.use(express.static('../public'));
app.use(require('cookie-parser')());
app.use('/api/auth',authRouter)


app.get('/api/test', (req, res) => res.send('Hello World!'));

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));