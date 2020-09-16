import * as mongoose from 'mongoose';
import * as  Joi from 'joi';
const { RefreshToken } = require('./refreshToken.model');

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    // TODO : keep it for the rest
    // name: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     maxlength: 50
    // },
    // lastName: {
    //     type: String,
    //     required: true
    // },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true
    },
    password: {
      type: String,
      // match: /^[a-zA-z0-9]{2,32}$/, // TODO: change to 8-32
      required: true,
      trim: true,
    }
  },
  {
    // timestamps: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    useNestedStrict: true
  }
);


UserSchema.pre('remove', next => {
  const __this = this;
  RefreshToken.remove({ _id: __this._id }).exec();
  next();
});


const validateUser = (data) => {
  const schema = {
    // name: Joi.string().min(5).max(50).required(),
    // lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email({ minDomainAtoms: 2 }),
    // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    //email: Joi.string().email({ tlds: { allow: false } });
    password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{2,32}$')).required(), // change to 8-32
  };

  return Joi.validate(data, schema);
};

const validateLogin = (data) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email({ minDomainAtoms: 2 }),
    // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{2,32}$')).required(), // change to 8-32
  };

  return Joi.validate(data, schema);
};

const LoginAttemptsSchema = Schema({
  identityKey: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  failedAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  timeout: {
    type: Date,
    required: true,
    default: new Date()
  },
  inProgress: {
    type: Boolean,
  }
});

exports.userSchema = UserSchema;
exports.User = mongoose.model('User', UserSchema);
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;

exports.loginAttemptsSchema = LoginAttemptsSchema;
exports.LoginAttempts = mongoose.model('LoginAttempts', LoginAttemptsSchema);

