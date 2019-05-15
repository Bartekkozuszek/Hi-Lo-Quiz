module.exports = {
  question: { type: String, required: [true, 'Question is required'] },
  answer: { type: Number, required: [true, 'Answer is required'] },
  approved: { type: Boolean, required: false, default: false },
  userSubmitted: { type: Boolean, required: false },
  author: { type: String, required: false },
  category: { type: String, required: false },
  reviewedBy: { type: String, required: false },
  imageUrl: { type: String, required: false },
  learnMore: { type: String, required: false },
  low: { type: Number, required: false, min: [0, 'Low must not be negative'] },
  high: { type: Number, required: false, min: [0, 'High must not be negative'] }
}
