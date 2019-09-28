import * as mongoose from "mongoose";
import * as  Joi from 'joi';

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
            required: true,
            trim: true,
        }
    },
    {
        // timestamps: true,
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        useNestedStrict: true
    }
);

const validateUser = (data) => {
    const schema = {
        // name: Joi.string().min(5).max(50).required(),
        // lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{2,32}$')).required(), // change to 8-32
    };

    return Joi.validate(data, schema);
};

const validateLogin = (data) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{2,32}$')).required(), // change to 8-32
    };

    return Joi.validate(data, schema);
};

exports.userSchema = UserSchema;
exports.User = mongoose.model("User", UserSchema);
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;

