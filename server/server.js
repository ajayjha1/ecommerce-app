const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs')
require('dotenv').config()


// import routes
const authRoutes = require('./routes/auth')

//app
const app = express()

//db

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
})
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log("DB connected error message", err.message)
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

//route
app.get('/api', (req, res) =>{
    res.json({
        data: "hey you hit node API",
    }); 
});

//routes middleware
// app.use('/api', authRoutes);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`Server is running on port ${port}`)})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}