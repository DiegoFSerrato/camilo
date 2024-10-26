import { Schema, model } from 'mongoose';
const authorSchema = new Schema({
name:{
type: String,
required: true
},
lastName:{
type: String,
required: true
},
books:[
{
type: Schema.Types.ObjectId,
ref: 'Book'
}
],
creationDate:{
type: Date,
default: Date.now()
}
})
const Author = model('Author', authorSchema);
export { Author };