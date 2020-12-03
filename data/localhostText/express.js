const express = require('express');
const mongoose = require('mongoose');
const Text = require('./text');

const app = express();
const port = 5500;
const startServer = () => {
    app.listen(port, () => console.log(`App started on port ${port}`));

}

app.get('/textss', (req, res) => {
    Text.find({}, {
        _id: 0,
        addTime: 0,
        link: 0,
        publicationDate: 0,
        dateOfParsing: 0,
        previousDate: 0
    }, (err, text) => {
        if (err) 
            return console.log(err);
        res.send(text)
    });
})

const connectDb = () => {
    mongoose.promise = require('bluebird');

    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true
    }
    const url = "mongodb+srv://shweezzy:19961101@pravda.0jfpq.mongodb.net/news?retryWrites=true&w" +
            "=majority"

    mongoose.connect(url, options)
    return mongoose.connection
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)