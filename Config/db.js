const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database');
}).catch(err => {
    console.log('Error in Database connection');
});

module.exports = mongoose;
