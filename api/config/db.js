// Conecion a Atlas Mongo DB
import { connect } from "mongoose";

// ESto no es necesario
//const options = {
//    maxPoolSize: 100,
//    useNewUrlParser: true,
//   useInifiedTopology: true,
//}

const db_uri = process.env.db_uri;
 
connect(db_uri);