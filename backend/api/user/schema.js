module.exports = {
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  wins: { type: Number, required: false, default: 0 },
  losses: { type: Number, required: false, default: 0 },
  score: { type: Number, required: false, default: 0 }
}
