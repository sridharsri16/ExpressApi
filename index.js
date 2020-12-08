const express = require('express');
const cors = require('cors')
const app = express();
const db = require("./models");

//const logger = require('./middleware/logger')

//Middleware
//app.use('logger');

// Body Parser Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//candidate
app.use('/api/candidate', require('./routes/api/candidate'));
//user
app.use('/api/user', require('./routes/api/user'));
//vote
app.use('/api/vote', require('./routes/api/vote'));

const PORT = process.env.PORT || 54716;
//app.listen(PORT, () => console.log(`Server started ${PORT}`));
db.sequelize.sync().then(() => {
    app.listen(PORT, () => { console.log(`listening on: http://localhost:${PORT}`); });
});