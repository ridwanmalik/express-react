const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
router.get('/:id/posts', UserController.posts);
router.get('/:id/comments', UserController.comments);

module.exports = router;