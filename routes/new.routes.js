module.exports = app => {
    const news = require("../controllers/new.controller.js");
  
    var router = require("express").Router();
    router.get("/find-all-new-comment", news.findAllNewAndComment);
    // Create a new Tutorial
    router.post("/", news.create);
  
    // Retrieve all news
    router.get("/", news.findAll);
  
    // Retrieve all published news
    router.get("/published", news.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", news.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", news.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", news.delete);
  
    // Delete all news
    router.delete("/", news.deleteAll);

    // Create a comment
    router.post("/create-comment", news.createComment);

     // Retrieve a comments new with new id
    router.get("/find-comment-new/:newId", news.findNewAndCommentByNewId);

    // Retrieve a comments with id
    router.get("/find-comment-by-id/:commentId", news.findCommentById);
    // Retrieve all new with comments
  
    app.use('/api/news', router);

    
  };