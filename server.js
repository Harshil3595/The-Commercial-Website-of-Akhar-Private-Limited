const express=require('express');
const connecToMongotDB=require('./db')
const userRoutes=require('./Routes/userRoutes');
const inquiryRoutes=require('./Routes/inquiryRoutes')
const fileUpload=require('express-fileupload')
const cors=require('cors');
const dotenv=require('dotenv');

const app=express();
dotenv.config();


app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true,
    limits:{fileSize: 50 * 2024 * 1024}
}))

const port=process.env.PORT;

connecToMongotDB();

app.use('/api/auth',userRoutes);
app.use('/api/inquiry',inquiryRoutes);


app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})