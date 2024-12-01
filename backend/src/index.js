const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const empRoutes = require('./routes/EmpRoutes');
//const DB_URL = "mongodb://mongodb:27017/comp3123_assignment2";
const DB_URL = "mongodb+srv://hapoves:tIylw8LgAiHhAYy7@cluster.t2yhh.mongodb.net/comp3123_assigment2?retryWrites=true&w=majority&appName=Cluster";
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err);
    process.exit();
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);


app.listen(5000, () =>[
    console.log('Server is running on port 5000')
])