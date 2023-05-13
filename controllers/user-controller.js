const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
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
            { _id: params.userId },
            { $set: body },
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
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserDeleteData => {
                console.log(dbUserDeleteData);
                if (!dbUserDeleteData) {
                    res.status(400).json({ message: 'There is no existing User to delete with this ID' });
                    return;
                }
                res.status(200).json({ message: 'User has been successfully deleted' });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    addFriend({ params }, res) {
        console.log("params user id");
        console.log(params.userId);
        console.log("params friend id");
        console.log(params.friendId);
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: 'There is no user with this id!' });
                    return;
                }
                res.json(dbFriendData);
            })
            .catch(err => res.json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbMinusFriend => {
                if (!dbMinusFriend) {
                    res.status(404).json({ message: 'No ex-friend with id here!' });
                    return;
                }
                res.json(dbMinusFriend);
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            });
    }
};

module.exports = userController;