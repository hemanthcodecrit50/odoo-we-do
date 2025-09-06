const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: { 
        type: String, 
        default: '' 
    },
    avatarUrl: { 
        type: String, 
        default: '' 
    },
    productIds: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }]
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
}

const User = mongoose.model('user', userSchema)
module.exports = User