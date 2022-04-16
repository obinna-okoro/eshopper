import express from "express";
import data from "./data.js"
import dotenv from "dotenv"
import mongoose from 'mongoose';
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";






dotenv.config()

//Connect Database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {console.log("we are connected to the database.")})
.catch((error) => { console.log('an error occurred while connecting ot the db', error)})

const app = express()

app.use(express.json())



app.use("/api/seed", seedRouter)

app.use("/api/products", productRouter)




const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})

