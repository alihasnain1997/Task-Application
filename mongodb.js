// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const {MongoClient,ObjectId}=require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = "mongotest";

MongoClient.connect(connectionURL,{ useNewUrlParser: true,
    useUnifiedTopology: true},(err,client)=>{

if(err)
{
    return console.log("error occured"+err);

}

    const db=client.db(dbName);


//     db.collection('users').insertMany(
//     [
//     {
//         name: 'ahmed',
//         age: 28
//     },
//     {
//         name: 'fahad',
//         age: 27

//     }

// ],(error,result)=>{
//         if(error){
//             return console.log("unable to insert data "+ error);

//         }
//         return console.log(result.ops);
        

//      });

// db.collection('users').find({}).toArray((error,result)=>{


//     if(error){
//         return console.log("unable to insert data "+ error);
//     }
//     return console.log(result);
// })


db.collection('users').find({}).sort({age:-1}).limit(1);

});