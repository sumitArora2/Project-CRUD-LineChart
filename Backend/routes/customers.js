const express = require('express');
const router = express.Router();

// Student model
const Customers = require('../models/customers');

// Student Health model
const CustomersHealth = require('../models/customersHealth');


// @route   GET /api/students/
// @desc    Get all students
// @access  Public
router.get('/', async (req, res) => {
  try {
    const customers = await Customers.find({});
    res.send({ customers })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});



// @route   GET /api/students/health
// @desc    Get all students health
// @access  Public
router.get('/health', async (req, res) => {
  try {
    const students = await CustomersHealth.find({});
    res.send({ students })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});



// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let customer = await Customers.findById(req.params.id);
    const date_wise_steps = await CustomersHealth.aggregate([
      {
        $match: {
          customerId: req.params.id
        }
      },
      {
        $group: {
          _id: "$date",
          totalSteps: { $sum: "$steps" }
        }
      },
      {
        $sort: {
          _id: 1 // Sort by _id in ascending order (date field)
        }
      }
    ]);
    res.send({ customer,date_wise_steps });
  } catch (err) {
    res.status(404).send({ message: 'Student not found!' });
  }
});

// @route   POST /api/customers/
// @desc    Create a student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newCustomer = await Customers.create({ firstName: req.body.firstName,lastName: req.body.lastName,
      mobile: req.body.mobile, email: req.body.email,dob: req.body.dob,
       avg_steps: req.body.avg_steps,avg_sleep: req.body.avg_sleep,avg_calories: req.body.avg_calories,goal: req.body.goal });
     res.send({ newCustomer });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


// @route   POST /api/studentsHealth/
// @desc    Create a student health data
// @access  Public
router.post('/health', async (req, res) => {
  try {
    const newCustomer = await CustomersHealth.create({ customerId: req.body.customerId, date: req.body.date, steps: req.body.steps });
    let averageSteps = await CustomersHealth.aggregate([
      {
        $match: {
          customerId: req.body.customerId
        }
      },
      {
        $group: {
          _id: null,
          averageSteps: { $avg: "$steps" }
        }
      },
      {
        $project: {
          _id: 0,
          averageSteps: { $round: ["$averageSteps", 2] }
        }
      }
    ]);
    console.log("averageSteps",averageSteps)
    await Customers.findByIdAndUpdate(req.body.customerId, {avg_steps:averageSteps[0].averageSteps});
    res.send({ newCustomer,averageSteps });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});




// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Customers.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The student was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeStudent = await Customers.findByIdAndRemove(req.params.id);
     res.send({ message: 'The student was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});



// @route   GET /api/students/date/healthDate
// @desc    Get all students date health
// @access  Public
router.get('/date/healthData', async (req, res) => {
  try {
    const students = await CustomersHealth.aggregate([
      {
        $group: {
          _id: "$date",
          totalSteps: { $sum: "$steps" }
        }
      },
      {
        $sort: {
          _id: 1 // Sort by _id in ascending order (date field)
        }
      }
    ]);
    res.send({ students })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});



module.exports = router;