import express from "express";
import data from "./data.js"
import dotenv from "dotenv"
// import mongoose from 'mongoose';



const app = express()

app.use(express.json())


dotenv.config()

// //Connect Database
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
// .then(() => {console.log("we are connected to the database.")})
// .catch((error) => { console.log('an error occurred while connecting ot the db', error)})




app.get("/api/products", (req, res) => {
    res.status(200).send(data.products)
})

app.get("/api/products/slug/:slug", (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug)

    if(product) {
        return res.status(200).send(product)
    } else {
        res.status(404).send({message: "Product not found"})
    }
    
})

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(x => x._id === req.params.id)

    if(product) {
        return res.status(200).send(product)
    } else {
        res.status(404).send({message: "Product not found"})
    }
    
})


const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})

