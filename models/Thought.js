const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        // ? required,
        // ? between 1-280 char
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal) // get'ting formatting function from Utils
        // doing this call here, means it will be formatted before controllers even receive the data && timestamp value will be stored, but displayed w/ formatting
    },
    username: {
        type: String,
        // ? required
    },
    /*
    ReactionSchema: [{
        reactionId: {
            // ? Use Mongoose's ObjectId data type
            // ? default: newObjectId
        },
        reactionBody: {
            type: String,
            // ? REquire
            // ? 280 char max
        },
        username: {
            type: String,
            // ? ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal) // get'ting formatting function from Utils
            // doing this call here, means it will be formatted before controllers even receive the data && timestamp value will be stored, but displayed w/ formatting
        }
    }]
    */
},
    {
        toJSON: {
            virtuals: true, // need for friendCount
            getters: true // tells Mongoose to use the GETTER function for Utils Date Formatting
        },
        id: false
    }
);

// ? ReactionSchema.virtual('reactionCount').get(function () {
// ?     return this.reactions.length;
// ? });

// ? ThoughtSchema.virtual('thoughtCount').get(function () {
// ?     return this.thoughts.length;
// ? });

const Thought = model('Thought', ThoughtSchema);
// ? const Reaction = model('Reaction', ReactionSchema);

module.exports = Thought;


// ! don't forget to import Thought.js model into models/index