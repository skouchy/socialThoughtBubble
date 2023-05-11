const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            // .populate({
            //     path: 'thoughts'
            //     // select: '-__v'
            // })
            // .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // .populate({
            //     path: 'thoughts'
            //     // select: '-__v'
            // })
            // .select('-__v')
            .then(dbOneUser => {
                if (!dbOneUser) {
                    res.status(404).json({ message: 'There is no user with this ID' });
                    return;
                }
                res.json(dbOneUser);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createUser({ body }, res) { // destructuring req.body to receive only the 'body' from the REQuest Object
        User.create(body)
            .then(dbNewUserData => res.json(dbNewUserData))
            .catch(err => res.status(500).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate( //findOneAndUpdate allows more flexibility for future developments, as it carries more data than other Mongoose update methods
            { _id: params.id },
            body,
            { new: true, runValidators: true } // new: instructs Mongoose to return the 'new' updated User Document // runValidators: Instructs Mongoose to access use of built-in Validation functionality 
        )
            .then(dbUserUpdateData => {
                if (!dbUserUpdateData) {
                    res.status(404).json({ message: 'There is no such user to update with this ID' });
                    return;
                }
                res.json(dbUserUpdateData); // Updated doc is returned if all runs successfully
            })
            .catch(err => res.status(500).json(err));
    },
    removeUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
            .then(dbUserDeleteData => {
                if (!dbUserDeleteData) {
                    res.status(400).json({ message: 'There is no existing User to delete with this ID' });
                    return;
                }
                res.json(dbUserDeleteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = userController;