require('dotenv').config();
const router = require('express').Router();
const debugging = process.env.DEBUGGING.toLowerCase() === 'true' || false;

// ==============================================
// this JS file includes helpers that access our
// database accordingly (for example, getReviews
// requests all the reviews in the reviews database)
// ==============================================
const reviewsDb = require('./reviewsHelper.js');

// GET request that returns all reviews from the database
router.get('/reviews', async (req, res) => {
  // get all reviews
  const allReviews = await reviewsDb.getReviews();
  try {
    // return all reviews to the caller
    return res.status(200).json(allReviews);
  } catch (error) {
    // catch any error left and send it to the caller
    return res.status(500).json({
      message: 'the reviews could not be retrieved',
      error: error.message
    });
  }
});

// GET request that gets a review by id
router.get('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewsDb.getReviews(id);
    if (debugging === true) console.log('GET Review Router:', review);

    review
      ? res.status(200).json(review)
      : res
          .status(404)
          .json({ error: 'The review with the specified ID does not exist' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
