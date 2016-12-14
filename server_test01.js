let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;


var url = 'mongodb://localhost:27017/Maryensztadt';

//MongoClient.connect(url).then((database) => {
//    console.log("Connected");
//    db = database;
//    return database.collection('customers');
//}).then((collection) => {
//    console.log("Got Collection");
//   let cursor = collection.find({}).skip(12).limit(2);
//   return cursor;
//}).then((cursor) => {
//    console.log("Got Cursor");
//    let data = cursor.toArray();
//    return data;
//}).then((data) => {
//    console.log("Got Data");
//    console.log(data);
//}).then(() => {
//    console.log("Close connection");
//    if(db) db.close();
//}).catch((error) => {
//    console.log("Error");
//    console.log(error);
//    if(db) db.close();
//});

const defaultCollation = { 'locale' : 'pl', strength: 2, caseLevel: false };

const getDocuments = (db, collectionName, filter, limit, skip, sort, project) => {
    return new Promise((resolve, reject) => {
        try {
            if(!db) {
                throw new Error("Not connected to the Mongodb");
            }

            if(!collectionName || collectionName === '') {
                throw new Error("collectionName not specified");
            }

            Promise.resolve(db.listCollections({name: collectionName}).toArray()).then((collections) => {
                if(collections.length !== 1) {
                    throw new Error(`Collection ${collectionName} doesn't exist`);
                }
                return db.collection(collectionName);
            }).then((collection) => {
                return collection.find(filter || {}, undefined, {collation: defaultCollation});
            }).then((cursor) => {
                return cursor;
            }).then((cursor) => {
                if(limit) cursor = cursor.limit(limit);
                return cursor;
            }).then((cursor) => {
                if(skip) cursor = cursor.skip(skip);
                return cursor;
            }).then((cursor) => {
                if(project) cursor = cursor.project(project);
                return cursor;
            }).then((cursor) => {
                console.log(sort);
                if(sort) cursor = cursor.sort(sort, undefined, {collation: defaultCollation});
                return cursor;
            }).then((cursor) => {
                let data = cursor.toArray();
                return data;
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

const getDocumentById = (db, collectionName, id) => {
    return getDocuments(db, collectionName, {_id: new ObjectID(id)});
}

(()=>{
    let db;

    MongoClient.connect(url).then((database) => {
        db = database;
        //let filter = null;
        //let filter =  {_id: new ObjectID('58482576fc13ae13f90003ae')};
        //return getDocuments(database, 'customers',filter, 1, 0);
        //return getDocumentById(database, 'customers','58482576fc13ae13f90003ae');
        return getDocuments(database, 'customers', undefined, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1});
    }).then((data) => {
        console.log("Got Data");
        data.forEach(function(element) {
            console.log(element);
        }, this);
        if(db) db.close()
    }).catch((error) => {
        console.log("Error");
        console.log(error);
        if(db) db.close()
    });
})();
