const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MapSchema = new Schema(
    {
        title: { type: String, required: true },
        templateType: { type: String, required: true },
        creationDate: { type: Date, default: Date.now },
        creatorID: {type: Schema.Types.ObjectId, ref: 'User', required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Map', MapSchema)