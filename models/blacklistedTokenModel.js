import mongoose from 'mongoose';

//blacklisted token
const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: '24h',
  },
});

const BlacklistedTokenModel = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

export default BlacklistedTokenModel;