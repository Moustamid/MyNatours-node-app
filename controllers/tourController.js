const Tour = require('./../models/tourModel');

//! ----------- Route Hundlerse -----------  :

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    //- status 201 : created
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    //- status 400 : bad request
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    //- status 200 : succesfull request
    res.status(200).json({
      status: 'success',
      data: {
        updatedTour
      }
    });
  } catch (err) {
    //- status 400 : bad request
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  await Tour.findByIdAndRemove(req.params.id);

  try {
    //- status 204 : no centent
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    //- status 400 : bad request
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
