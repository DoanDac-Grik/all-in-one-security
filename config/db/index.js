const mongoose = require('mongoose');

// Connection string to mongoDB atlas
const MongoDBURI = "mongodb+srv://team:team@all-in-one-security.ccwhl.mongodb.net/all-in-one-security?retryWrites=true&w=majority"

// Connect DB
async function connect() {
    try {
        await mongoose.connect(MongoDBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect failed");
    }   
}

module.exports = { connect };