const db = require("../models");
const Op = db.Sequelize.Op;

const New = db.news;
const Comment = db.comments;


// Create and Save a new New
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a New
  const newData = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save New in the database
  New.create(newData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the New."
      });
    });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  New.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News."
      });
    });
};

// Find a single New with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  New.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving New with id=" + id
      });
    });
};

// Update a New by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  New.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "New was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update New with id=${id}. Maybe New was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating New with id=" + id
      });
    });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  New.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "New was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete New with id=${id}. Maybe New was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete New with id=" + id
      });
    });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
  New.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} News were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all News."
      });
    });
};

// find all published New
exports.findAllPublished = (req, res) => {
  New.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News."
      });
    });
};

exports.createComment = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }

  const commentData = {
    name: req.body.name,
    text: req.body.text,
    newId: req.body.newId,
  };

  Comment.create(commentData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating comment."
      });
    });
};

exports.findNewAndCommentByNewId  = (req, res) => {
  const newId = req.params.newId;

  New.findByPk(newId, { include: ["comments"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving New with id=" + newId
      });
    });
};

exports.findCommentById = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findByPk(commentId, { include: ["new"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: " Error while finding comment id=" + commentId
      });
    });
};


exports.findAllNewAndComment = (req, res) => {
  New.findAll({
    include: ["comments"],
  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving all new and comment"
      });
    });
};