import { Schema, model } from 'mongoose';

const editorialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

const Editorial = model('Editorial', editorialSchema);

export { Editorial };
