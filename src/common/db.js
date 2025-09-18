import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://eva2_spring:vP1JebsPcSSRUQ0L@cluster-spring.vdjvscn.mongodb.net/?retryWrites=true&w=majority&appName=cluster-spring";
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