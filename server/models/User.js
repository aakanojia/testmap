const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        userID: {type: String, required: true},
        username: {type: String, required: true},
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        createdMaps: [{type: ObjectId, ref: 'Map'}]
        //,
       /* securityQuestions: {type: String, required: true},
        createdMaps: [{type: ObjectId, ref: 'Playlist'}],
        likedMaps: [{type: ObjectId, ref: 'Playlist'}],
        comments: [{type: ObjectId, ref: 'Playlist'}]*/
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
