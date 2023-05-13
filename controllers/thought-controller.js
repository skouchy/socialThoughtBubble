const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions'
            })
            .then(dbAllThoughts => {
                console.log(`ALL THOUGHTS: `, dbAllThoughts);
                res.json(dbAllThoughts)
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions'
            })
            .then(dbOneThought => {
                console.log(`ONE THOUGHT: `, dbOneThought);
                if (!dbOneThought) {
                    res.status(404).json({ message: 'Who would\'ve thought that this thought ID does not exist' });
                    return;
                }
                res.json(dbOneThought);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                console.log(_id);
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'There is no existing user with this id. Try again' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought here...' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    removeThought({ params }, res) {
        // ? first: delete the thought
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                console.log(`DELETEDTHOUGHT: `, deletedThought);
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id' });
                }
                // ? second: remove it from the user
                return User.findOneAndUpdate( // findOneAndDelete: returns data(deletedThought) and uses it to identify which user by _id, and then....
                    { username: body.username },
                    { $pull: { thoughts: params.thoughtId } }, // ...$pull method removes it from associated user
                    { new: true }
                );
            });
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'This Thought does not exist' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;