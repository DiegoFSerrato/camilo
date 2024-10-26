import mongoose from 'mongoose';
import 'dotenv/config';
export const connectiondb = async()=>{
const URI = process.env.MONGODB_URI;
if(!URI){
throw new Error('No se ha definido la URI de la base')
}
try{
await mongoose.connect(URI);
console.log('Base de datos conectada');
}catch(e){
    console.error(e);
    throw new Error('Error a la hora de iniciar la base de')
    }
}