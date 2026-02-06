const Review = require("../models/Review");
const { validateReview } = require("../utils/validation");

const createReview = async (req, res, next) => {
  const { error } = validateReview(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const review = await Review.create({ ...req.body, author: req.user._id });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ author: req.user._id });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) res.json(review);
    else res.status(404).json({ message: "Review not found" });
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review && review.author.toString() === req.user._id.toString()) {
      Object.assign(review, req.body);
      const updatedReview = await review.save();
      res.json(updatedReview);
    } else {
      res.status(403).json({ message: "Not authorized or not found" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review && review.author.toString() === req.user._id.toString()) {
      await review.deleteOne();
      res.json({ message: "Review removed" });
    } else {
      res.status(403).json({ message: "Not authorized or not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
