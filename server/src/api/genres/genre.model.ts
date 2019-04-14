import * as mongoose from "mongoose";
import * as  Joi from 'joi';

const Schema = mongoose.Schema;

const GenreSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        photos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Photo',
                required: false
            }
        ]
    },
    {
        timestamps: true,
        useNestedStrict: true
    }
);

const validateGenre = (rental) => {
    const schema = {
        name: Joi.string().regex(new RegExp('^[a-zA-z]{2,50}$')).required(),
        photos: Joi.array().items(Joi.string())
    };

    return Joi.validate(rental, schema);
};

exports.genreSchema = GenreSchema;
exports.Genre = mongoose.model("Genre", GenreSchema);
exports.validate = validateGenre;
