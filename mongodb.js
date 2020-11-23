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

//INSERT
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

//READ
// db.collection('users').find({}).toArray((error,result)=>{


//     if(error){
//         return console.log("unable to insert data "+ error);
//     }
//     return console.log(result);
// })

//READ + SORTING
// db.collection('users').find({}).sort({age:-1}).toArray((error,result)=>{


//     if(error){
//                 return console.log("unable to insert data "+ error);
//             }
//             return console.log(result);

// });

//UPDATE With PROMISES
db.collection('users').updateOne({
    _id: new ObjectId('5fb77c59e1ad042900ba46a8')
},{
    $inc:{
        age:1
    }
}).then((result) => {
    console.log(result);
    
}).catch((err) => {
    console.log(err);
});

});