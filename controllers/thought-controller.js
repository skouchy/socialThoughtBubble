const { User, Thought } = require('../models');

const thoughtController = {
    removeThought({ params }, res) {
        // ? first: delete the thought
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id' });
                }
                // ? second: remove it from the user
                return User.findOneAndUpdate( // findOneAndDelete: returns data(deletedThought) and uses it to identify which user by _id, and then....
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } }, // ...$pull method removes it from associated user
                    { new: true }
                );
            });
    }
}

module.exports = thoughtController;