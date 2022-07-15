const express=require("express");
const bodyParser=require("express");
const port=3030;
const app=express();
const producRoutes=require("./src/routes/product");
const userRoutes=require("./src/routes/user");
const mongoose=require("mongoose");
const uri=require("./src/auth/auth")
//DB Connection---------------------------------------------
mongoose.connect(uri)

//--Required for getting the data passed in body
//req.body won't work otherwise

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS-----------------------------------------
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    // res.header('Access-Control-Request-Headers','Authorization','Content-Type','Origin');
    // res.header('Access-Control-Allow-Methods',' GET,POST,PATCH,DELETE,PUT')
    next()
})

//Re-routing all the requests to this end point
app.use("/product",producRoutes);
app.use("/user",userRoutes)

//----------------------------------------------


//error handler
app.use((req,res,next)=>{
    const error=new Error("Not found");
    error.status=400;
    next(error)
})

//main error handler
app.use((error,req,res,next)=>{
    res.status(error.status||500).json({
        message:error.message
    });
})

app.listen(port,()=>{
    console.log("Invalid request");
});
