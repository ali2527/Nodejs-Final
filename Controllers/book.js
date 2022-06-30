const {apiResponse,genrateToken} = require('../Helpers');
const Book = require('../Models/book');

exports.addBook = (req,res) =>{
    try {
        Book.create(req.body,function (err,category){
            if(err){
                return res.status(400).json(apiResponse({},err.message,false))
            }
            return res.status(200).json(apiResponse(category,"Book Created Successfully",true))
        })  
    } catch (error) {
        return res.status(400).json(apiResponse({},error.message,false))
    }    
}

exports.getBook = (req, res) => {
    try {
        Book.find({}, (err, categories) => {
            if (err) {
                return res.status(500).json(apiResponse({}, err.message, false));
            }
            res.status(200).json(apiResponse(categories, "", true));
        }
        )
    } catch (error) {
        res.status(500).json(apiResponse({}, error.message, false));
    }
}

// get book by id
exports.getBookById = (req,res) =>{
    try {
        Book.findById(req.params.id,function (err,book){
            if(err){
                return res.status(400).json(apiResponse({},err.message,false))
            }
            return res.status(200).json(apiResponse(book,"Book Found Successfully",true))
        })
    } catch (error) {
        return res.status(400).json(apiResponse({},error.message,false))
    }
}


exports.updateBook = (req, res) => {
    try {
        Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, category) => {
            if (err) {
                return res.status(500).json(apiResponse({}, err.message, false));
            }
            res.status(200).json(apiResponse(category, "Book Updated Successfully", true));
        }
        )
    } catch (error) {
        res.status(500).json(apiResponse({}, error.message, false));
    }
}

exports.deleteBook = (req,res) =>{
    try{
        Book.findByIdAndDelete(req.params.id,(err,category)=>{
            if(err){
                return res.status(500).json(apiResponse({},err.message,false));
            }
            res.status(200).json(apiResponse({},"Book Deleted Successfully",true));
        }
        )

    }catch(error){
        return res.status(400).json(apiResponse({},error.message,false))
    }
}