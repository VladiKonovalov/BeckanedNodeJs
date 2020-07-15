const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, require: true },
        description: { type: String, require: true },
        creater: { type: String , require: true ,ref: 'User'},
        createdDate :{type: Date}
    }
);

module.exports = mongoose.model('Task', taskSchema);