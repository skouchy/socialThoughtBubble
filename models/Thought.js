const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (dateValue) => formatDate(dateValue) // get'ting formatting function from Utils
        // doing this call here, means it will be formatted before controllers even receive the data && timestamp value will be stored, but displayed w/ formatting
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (dateValue) => formatDate(dateValue) // get'ting formatting function from Utils
        // doing this call here, means it will be formatted before controllers even receive the data && timestamp value will be stored, but displayed w/ formatting
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        ReactionSchema
    ]
},
    {
        toJSON: {
            virtuals: true, // need for friendCount
            getters: true // tells Mongoose to use the GETTER function for Utils Date Formatting
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;

