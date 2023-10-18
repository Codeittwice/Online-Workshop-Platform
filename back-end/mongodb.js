// CRUD create read update delete
/// mongo command :   C:\Users\hmgad\MongoDB\bin\mongod.exe --dbpath=C:\Users\hmgad\MogoDB-data
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
// mongoose 5.3.16

const { MongoClient, ObjectID } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "online-workshop-portal";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);
  }
);
