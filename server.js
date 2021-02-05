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

//- schema TODO: move to an other folder ... starts here .
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name '],
    unique: true
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price '] }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  // rating: 4.7,
  price: 997
});

testTour
  .save()
  .then(doc => {
    console.log('doc', doc);
  })
  .catch(err => {
    console.log('err 😨', err);
  });

//- schema TODO:  move to an other folder ... ends here .

// ! start server :
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
