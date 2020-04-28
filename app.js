const PlayStore = require('./node-postgress-playstore');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.get('/apps', (req, res) => {
  const sort = req.query.sort;
  const genre = req.query.genre;

  let result = [...PlayStore];
  // let genresSorted = [];
  if (sort) {
    if (sort !== 'Rating' && sort !== 'App') {
      res.status(400).send('supply correct values to sort.');
    }

    if (sort === 'Rating') {
      result = result.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });

    }

    if (sort === 'App') {
      result = result.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });
    }
  }
  if(genre) {
    // console.log(result.Genres)
  // Genres here
  if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
    //Values: one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

      return res 
        .status(400)
        .send('Genre must include valid genre')
  }
    else {
      console.log(genre)
      result = result.filter(result => result.Genres.toLowerCase().includes(genre.toLowerCase()))

    }
  

  }
  // res.status(500).send('Oops! You did it again.');

  res.status(200).json(result);
  //default
  // res.status(200).send(res.json(PlayStore)); //incorrect
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});