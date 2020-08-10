// import express
const express = require("express")

// create a new express router 
const router = express.Router()
const posts = require("../data/db")

// POST *CREATE A POST*
router.post("/", (req, res) => {
    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Missing information either Title or Contents",
        })
    }

    posts.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error creating a new post",
			})
		})
})

// POST *CREATE A COMMENT FOR THE SPECIFIED POST*
router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const comment = {...req.body, post_id: req.params.id };
    if (!req.params.id) {
        res.status(404).json({ message: 'ID not found' });
    } else if (!req.body.text) {
        res.status(400).json({ errorMessage: 'Please provide a comment in text.' });
    } else {
        posts.insertComment(comment)
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(error => {
                console.log('Error: ', error);
                res.status(500).json({
                    error: 'Unable to save comment'
                });
            });
    }
});

// GET *RETURN POSTS*
router.get("/", (req, res) => {
    posts.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving posts"
        })
    })
})

// GET *RETURN POSTS by ID*
router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving posts"
        })
    })
})

// GET *RETURN COMMENTS by POST ID*
router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
    .then((comments) => {
        res.status(200).json(comments)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error getting comments"
        })
    })
})