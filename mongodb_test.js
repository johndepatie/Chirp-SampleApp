const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jdepatie:<wtMa07inb7G%2A%400>@chirp.rvmug.gcp.mongodb.net/chrip?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db('comics');
  const collection = db.collection('superheroes');

  collection.find({}).toArray((error, documents) => {
    console.log(documents);
    client.close();
});