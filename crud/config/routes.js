const express = require('express');
const persons = require('../controllers/persons');
const router = express.Router();

router.get('/persons', persons.allPersons);

router.get('/persons/:id', persons.findPerson);

router.post('/persons', persons.createPerson);

router.patch('/persons/:id', persons.updatePerson);

router.delete('/persons/:id', persons.deletePerson);

module.exports = router;
