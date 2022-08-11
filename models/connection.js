const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    // _id: {type: String}, //_id automattically through mongoose
    name: {type: String, required: [true, 'name is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    topic: {type: String, required: [true, 'topic is required']},
    details: {type: String, required: [true, 'details is required']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: Date, required: [true, 'date required']},
    starttime: {type: String, required: [true, 'start time required']},
    endtime: {type: String, required: [true, 'end time required']},
    hostname: {type: String, required: [true, 'host is required']},
    imageurl: {type: String, required: [true, 'online image url is required']}

},
{timestamps: true}
);

module.exports = mongoose.model('Connection', connectionSchema);