const mongoose=require('mongoose');
const connecToMongotDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/3D-Modeling`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}

module.exports=connecToMongotDB;