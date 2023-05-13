const express = require('express');
const mongoose = require('mongoose'); // setup mongoose to connect when app starts

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes'));

// tells Mongoose which db to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-thought-bubble', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// This logs mongo queries being executed!
mongoose.set('debug', true);


app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
