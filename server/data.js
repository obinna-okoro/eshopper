import bcrypt from "bcryptjs"


const data = {
    
    
    users: [
        {
            name: "Obinna",
            email: "admin@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true
        },
        {
            name: "John",
            email: "user@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false
        }
    ],
    
    
    
    
    products: [
       { 
        //    _id:"1",
            name: "Nike slim shirt",
           slug: "nike-slim-shirt",
           category: "shirt",
           image: "https://images.21run.com/product/n/i/nike_pro_slim_t_shirt_heren_zwart_bv5633_010_d928.jpg?auto=compress&fill=solid&fill-color=ffffff&fit=fillmax&h=1250&w=1250&s=d1324b997c17c13c7b6c018b4962b6a1",
           price: 120,
           countInStock: 10,
           brand: "Nike",
           rating: 4.5,
           numReviews: 10,
           description: "high quality product"
    },
    {   
        // _id:"2",
        name: "Nike slim pant",
        slug: "nike-slim-pant",
        category: "pants",
        image: "https://cache.mrporter.com/variants/images/30629810019411716/in/w2000_q80.jpg",
        price: 25,
        countInStock: 10,
        brand: "Nike",
        rating: 4.5,
        numReviews: 14,
        description: "high quality product"
 },
 {  
    //  _id:"3",
    name: "Adidas sport shoes",
    slug: "adidas-sport-shoes",
    category: "shoes",
    image: "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/14782348/2021/10/22/106073f4-c945-488e-ba05-7ffd90b8e9cc1634884245845-ADIDAS-Men-Sports-Shoes-2261634884245503-1.jpg",
    price: 50,
    countInStock: 10,
    brand: "Puma",
    rating: 4.5,
    numReviews: 10,
    description: "high quality product"
},
{  
    //  _id:"4",
    name: "Adidas Joggers",
    slug: "adidas-sport-joggers",
    category: "pants",
    image: "https://desportivo.de/media/catalog/product/cache/57b8e234991f6234dda7ae3007d3556c/1/_/1_716_2.jpg",
    price: 50,
    countInStock: 10,
    brand: "Adidas",
    rating: 4.5,
    numReviews: 10,
    description: "high quality product"
},
{  
    //  _id:"4",
    name: "Apple Smart Watch",
    slug: "apple-smart-watch",
    category: "electronics",
    image: "https://www.backmarket.de/cdn-cgi/image/format=auto,quality=75,width=1920/https://d1eh9yux7w8iql.cloudfront.net/product_images/300737_d147ecb7-6f5a-4574-ad18-3ecb138c6891.jpg",
    price: 250,
    countInStock: 5,
    brand: "Apple",
    rating: 4.5,
    numReviews: 17,
    description: "high quality product"
}
    ]
}

export default data