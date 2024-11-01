import express from 'express';

import DogBreed from '../models/DogBreed';

const router = express.Router();

router.get('/breeds', (req, res) => {
  DogBreed.find({})
    .then((DogBreedList) => {
      res.status(200).json(DogBreedList);
    }).catch((err) => {
      return res.status(422).send({ message: err });
    });
});

router.get('/breed/:breedName', (req, res) => {
  const name = req.params.breedName;
  if (!name) {
    return res.status(400).send({ message: 'breed name is required' });
  }
  DogBreed.findOne({ name: name })
    .then((dogBreed) => {
      res.status(200).json(dogBreed);
    }).catch((err) => {
      return res.status(422).send({ message: err });
    });
});


router.post('/breed', (req, res) => {

  if (!req.body.name || !req.body.origin || !req.body.description) {
    return res.status(400).send({ message: 'missing data to create a breed' });
  }

  const breed = new DogBreed(req.body);
  breed.save()
      .then((newDogBreed) => {
        res.status(200).json(newDogBreed);
      }).catch((err) => {
    return res.status(422).send({ message: err });
  });
});



export default router;
