import * as mongoose from 'mongoose';
import * as  Joi from 'joi';

const Schema = mongoose.Schema;

const PhotoSchema = Schema(
    {
        name:
        {
            type: String,
            required: true,
            trim: true,
            protect: true
        },
        file:
        {
            type: String,
            required: true,
            trim: true,
            protect: true
        },
        path:
        {
            type: String,
            required: true,
            trim: true,
            protect: true
        },
        genres: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Genre',
                required: false,
                protect: true
            }
        ]
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        // timestamps: true,
        useNestedStrict: true
    }
);

const validatePhoto = (data) => {
    return Joi.object({
        name: Joi.string().min(1).max(255).required(),
        // file: Joi.string().min(5).max(255).required(),
        // path: Joi.string().min(5).max(255).required().email(),
        genres: Joi.array().items(Joi.string().max(24).min(24))
        // genres: Joi.array().items(Joi.string().regex(new RegExp('/^(?=[a-f\\d]{24}$)(\\d+[a-f]|[a-f]+\\d)/i')))
    }).validate(data)
};

exports.photoSchema = PhotoSchema;
exports.Photo = mongoose.model('Photo', PhotoSchema);
exports.validate = validatePhoto;
