require('dotenv').config();
const router = require('express').Router();
const debugging = process.env.DEBUGGING.toLowerCase() === 'true' || false;

// ==============================================
// this JS file includes helpers that access our
// database accordingly (for example, getReviews
// requests all the reviews in the reviews database)
// ==============================================
const reviewsDb = require('./reviewsHelper.js');

//POST review
router.post('/reviews', async (req, res) => {
  if (req.body.textBody && req.body.rating) {
    // create a new review based on the caller body
    const newReview = await reviewsDb.insert(req.body);
    try {
      // respond with a 201 on success
      res.status(201).json(newReview);
    } catch (error) {
      // catch any error and return a 500
      return res.status(500).json({
        message: 'the review could not be added',
        error: error.message
      });
    }
  }
});

//PUT review
router.put('/reviews/:id', async (req, res) => {
  const { id } = req.params;

  const editedReview = await reviewsDb.update(req.params.id, req.body);

  if (req.body.textBody && req.body.rating) {
    try {
      // make sure edited review is not null
      if (editedReview === 0) {
        // if it is then send 404
        return res
          .status(404)
          .json({ Error: `Review with ID ${id} does not exist.` });
      } else {
        // otherwise send a 200 on success
        return res.status(200).json(editedReview);
      }
    } catch (error) {
      // catch any other error and send a 500
      return res.status(500).json({
        message: 'the review could not be edited',
        error: error.message
      });
    }
  }
});

//DELETE request that deletes a review
router.delete('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const deletedReview = await reviewsDb.remove(id);
  try {
    // make sure deletedReview is not null
    if (deletedReview === 0) {
      // otherwise return a 404
      return res
        .status(404)
        .json({ message: `the review with id ${id}  does not exist` });
    } else {
      // otherwise send a 200 on success
      return res.status(200).json(deletedReview);
    }
  } catch (error) {
    // catch any other error and return a 500 with the error message
    return res.status(500).json({
      message: 'the review could not be deleted',
      error: error.message
    });
  }
});

module.exports = router;
