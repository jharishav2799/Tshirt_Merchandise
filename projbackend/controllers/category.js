const Category = require("../models/category");


exports.getCategoryById = (req, res, next ,id) =>{
    Category.findById(id).exec((err,cate) => {
       if(err)
       {
           return res.status(400).json({
               error : "Category Not Found In DB"
           });
       }
       req.category = cate;
       next();
    });
}

//Create
exports.createCategory = (req,res) => {
    console.log(req.body);
    const category = new Category(req.body);
    category.save( (err,category)=> {
        if(err)
        {
            return res.status(400).json({
                error: "Not able to save category in DB"
            });
        }
        res.json({ category });
    });
}

//Read
exports.getCategory = (req, res) => {
   return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec( (err,items) => {
    if(err){
      return res.status(400).json({
          error: "No Category Found"
      });
    }
      res.json(items);
    });
}

//Update
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save( (err,updatedCategory)=> {
        if(err)
        {
            return res.status(400).json({
                error: "Failed to Update Category"
            });
        }
        res.json(updatedCategory);
    });
}

//Delete
exports.removeCategory = (req, res) => {
   var category = req.category;

   category.remove((err,category) => {
       if(err)
       {
           return res.status(400).json({
               error: "Failed to Delete the Category"
           });
       }
       res.json({
           message: `${category} Successfully Deleted`
       });
   })
}