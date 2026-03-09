const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Rejected', 'Offer'],
        default: 'Applied'
    },
    location: {
        type: String
    },
    notes: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: String
    },
    resumePublicId:{
        type:String
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)