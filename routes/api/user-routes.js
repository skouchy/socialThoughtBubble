const router = require('express').Router();

const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    removeUser 
} = require('../../controllers/user-controller');


router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

module.exports = router;