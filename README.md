# WebTech2

MERN full stack CRUD application

## Usage:
1. Install npm packages in ./NodeServer and in ./clientapp with
> ```npm install```

2. Starting the application:

    1. Start the database with the following command in ./mongoDB:
    > ```mongod --directoryperdb --dbpath ./mongo/data/db --logpath ./mongo/log/mongo.log --logappend```

    2. Start Node.JSbackend with the following commands in ./NodeServer (you must add a PrivateKey, which is stored as an environment variable):
    > ```export default PrivateKey=key-goes-here```
    > ```npm start```

    3. Start React.JS frontend with the following command in ./clientapp:
    > ```npm start```

3. The website can be reached at localhost:3000