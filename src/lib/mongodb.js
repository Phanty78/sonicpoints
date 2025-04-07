import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Veuillez définir la variable d'environnement MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Utilisation de la connexion MongoDB existante');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Tentative de connexion à MongoDB...');
    console.log('URI:', MONGODB_URI.replace(/:[^:@]*@/, ':****@')); // Cache le mot de passe dans les logs

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connecté à MongoDB avec succès');
        console.log('Base de données:', mongoose.connection.name);
        console.log('Hôte:', mongoose.connection.host);
        return mongoose;
      })
      .catch((error) => {
        console.error('Erreur de connexion à MongoDB:', error.message);
        if (error.name === 'MongoServerSelectionError') {
          console.error('Impossible de se connecter au serveur. Vérifiez:');
          console.error("1. Que le cluster est en cours d'exécution");
          console.error('2. Que votre IP est autorisée dans MongoDB Atlas');
          console.error('3. Que les identifiants sont corrects');
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Erreur lors de la connexion:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
