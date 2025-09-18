import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://aldoquirozandrade_db_user:efdFsaZLUEiRsiWT@eva-u3-express.yuvnp6w.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express';
const client = new MongoClient(uri);
const dbName = 'cine-db';

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');
    return client.db(dbName);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB Atlas:', error);
    throw error;
  }
}