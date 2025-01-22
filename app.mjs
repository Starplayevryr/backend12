import express from 'express'
import connectDb from './config/db.mjs'
import userRoutes from './routes/userRoutes.mjs';
import itemRoutes from './routes/itemRoutes.mjs';

const app = express()
app.use(express.json())

connectDb()

app.use('/api/item/',itemRoutes);
app.use('/api/users/',userRoutes);


app.listen(3000,()=>{
    console.log('server running at port 3000')
})