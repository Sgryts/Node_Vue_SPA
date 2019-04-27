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
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        useNestedStrict: true
    }
);

const validateGenre = (data) => {
    const schema = {
        name: Joi.string().regex(new RegExp('^[a-zA-z]{2,50}$')).required(),
    };

    return Joi.validate(data, schema);
};

GenreSchema.pre('deleteMany', next => {
    const genre = this;
    genre.model('Photo').deleteOne({person: genre._id}, next);
});

exports.genreSchema = GenreSchema;
exports.Genre = mongoose.model("Genre", GenreSchema);
exports.validate = validateGenre;
