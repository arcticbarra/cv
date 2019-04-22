const Person = require('../models/person');

module.exports.findPerson = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err || !person) {
      res.json({ success: false, msg: 'Person not found' })
    }

    res.json({
      success: true,
      person: {
        name: person.name,
        age: person.age,
        born: person.born,
        timeline: person.timeline,
        alliegance: person.alliegance,
        playedBy: person.playedBy,
        titles: person.titles,
        father: person.father,
        mother: person.mother,
        spouse: person.spouse
      }
    })
  })
}

module.exports.allPersons = function (req, res) {
  Person.find({}, function (err, persons) {
    if (err || !persons) {
      res.json({ success: false, msg: 'Error while fetching persons' })
    }

    persons = persons.map((person) => ({
      name: person.name,
      age: person.age,
      born: person.born,
      timeline: person.timeline,
      alliegance: person.alliegance,
      playedBy: person.playedBy,
      titles: person.titles,
      father: person.father,
      mother: person.mother,
      spouse: person.spouse
    }))

    res.json({
      success: true,
      persons
    })
  })
}

module.exports.createPerson = function (req, res) {
  const newPerson = new Person({
    name: req.body.name,
    age: req.body.age,
    born: req.body.born,
    timeline: req.body.timeline,
    alliegance: req.body.alliegance,
    playedBy: req.body.playedBy,
    titles: req.body.titles,
    father: req.body.father,
    mother: req.body.mother,
    spouse: req.body.spouse
  })
  newPerson.save(function (err) {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: 'Error while creating a new person' })
    }

    res.json({ success: true, msg: 'Person created succesfully' })
  })
}

module.exports.updatePerson = function (req, res) {
  Person.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }, function (err, person) {
    if (err) {
      res.json({ success: false, msg: 'Error while updating person' })
    }

    res.json({
      success: true, msg: 'Person succesfully updated', person: {
        name: person.name,
        age: person.age,
        born: person.born,
        timeline: person.timeline,
        alliegance: person.alliegance,
        playedBy: person.playedBy,
        titles: person.titles,
        father: person.father,
        mother: person.mother,
        spouse: person.spouse
      }
    })
  })
}

module.exports.deletePerson = function (req, res) {
  Person.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json({ success: false, msg: 'Error while deleting person' })
    }

    res.json({ success: true, msg: 'Person deleted succesfully' })
  })
}
