//userroutes.js

const express = require('express');
const router = express.Router();
const userController = require('../userController'); 

router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.get('/users/:userId', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/users/:userId/give-money', userController.giveMoneyToUser);


module.exports = router;
