const express = require('express');
const router = express.Router();
const  {getBook,getBookById,updateBook,deleteBook,addBook} = require('../../Controllers/book');


router.post('/',addBook)
router.get('/',getBook);
router.get('/:bookId',getBookById);
router.put('/:id',updateBook);
router.delete('/:id',deleteBook);

module.exports = router;