const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId, // we need to tell Mongoose to expect an ObjectId and that its data comes from the Thought model
            ref: 'Thought' // tells user model which document to search to find the right thoughts
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
             // we need to tell Mongoose to expect an ObjectId and that its data comes from the Thought model
            ref: 'User' // tells user model which document to search to find the right thoughts
        }
    ]
},
    {
        toJSON: {
            virtuals: true, // need for friendCount
        },
        id: false // false because this is a virtual that Mongoose returns (...& we dont need it)
    });

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;