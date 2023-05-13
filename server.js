const express = require('express');
// const mongoose = require('mongoose');
const db = require('./config/connection');
// const { MongoClient } = require('mongodb'); // setup mongoose to connect when app starts

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes'));

// tells Mongoose which db to connect to
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-thought-bubble', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     /*If the environment variable MONGODB_URI exists, like on Heroku when we deploy later, it will use that. Otherwise, it will short-circuit to the local MongoDB server's database at mongodb://localhost:27017/pizza-hunt. The second argument in the example is a set of configuration options Mongoose asks for more information about.
//     https://mongoosejs.com/docs/connections.html#options*/
// });

// // Use this to log mongo queries being executed!
// mongoose.set('debug', true);
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Connected on localhost:${PORT}`)
    });
})