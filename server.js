const mongoose = require('mongoose');

//! read the variables from the '.env' file and save them into the env varibles ✔
const dotenv = require('dotenv').config();

const app = require('./app');

//!Connection to mongoose :
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    //- options to deal with some worrnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

// ! start server :
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
