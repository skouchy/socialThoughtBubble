const { User, Thought } = require('../models');


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
            })
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
        User.findOneAndDelete({ _id: params.userId })
            .then((dbUserData) => {
                console.log(`DB DATAAAA: `, dbUserData);
                if (!dbUserData) {
                    return res.status(404).json({ message: 'This data does not exist' })
                }
                // Deletes child thoughts to Deleted User parent
                Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
                    .then(res.json({ message: 'The user & their associated data has been deleted!' }));

            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    }
};

module.exports = userController;