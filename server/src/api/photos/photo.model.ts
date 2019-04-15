import * as mongoose from "mongoose";
import * as  Joi from 'joi';

const Schema = mongoose.Schema;

const PhotoSchema = Schema(
    {
        name:
            {
                type: String,
                required: true
            },
        file:
            {
                type: String,
                required: true
            },
        path:
            {
                type: String,
                required: true
            },
        genres: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Genre',
                required: false
            }
        ]
    },
    {
        // timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        timestamps: true,
        // useNestedStrict: true
    }
);

const validatePhoto = (rental) => {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        // file: Joi.string().min(5).max(255).required(),
        // path: Joi.string().min(5).max(255).required().email(),
        genres: Joi.array().items(Joi.string())
    };

    return Joi.validate(rental, schema);
};

exports.photoSchema = PhotoSchema;
exports.Photo = mongoose.model("Photo", PhotoSchema);
exports.validate = validatePhoto;

export default mongoose.model("Photo", PhotoSchema);
