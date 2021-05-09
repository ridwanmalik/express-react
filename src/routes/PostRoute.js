const express = require('express');
const router = express.Router();

const PostController = require('../controllers/PostController');


router.get('/', PostController.index);
router.get('/:id', PostController.show);
router.post('/', PostController.store);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);
router.get('/:id/comments', PostController.comments);
router.post('/:id/comments', PostController.storeComment);

module.exports = router;