import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RefreshTokenSchema = Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            protect: true
        },
        expiration: {
            type: Number,
            required: true,
            trim: true,
            unique: false,
            protect: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'RefreshToken',
            required: true,
            unique: true,
            trim: true,
            protect: true
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        useNestedStrict: true
    }
);

exports.RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

