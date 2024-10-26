import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Author'
        }
    ],
    editorial: {
        type: Schema.Types.ObjectId,
        ref: 'Editorial'
    },
    publicationDate: {
        type: Date,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

const Book = model('Book', bookSchema);

export { Book };
