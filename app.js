const PlayStore = require('./node-postgress-playstore');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.get('/apps', (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genre;

  let playStoreSorted = [];

  if (sort) {
    if (sort !== 'Rating' && sort !== 'App') {
      res.status(400).send('supply correct values to sort.');
    }

    if (sort === 'Rating') {
      playStoreSorted = PlayStore.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });

    }

    if (sort === 'App') {
      playStoreSorted = PlayStore.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });
    }
  }



  //Genres here
  // if (genres) {
  //   //Values: one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
  //   if () 
  // }


  // res.status(500).send('Oops! You did it again.');

  res.status(200).json(playStoreSorted);
  //default
  // res.status(200).send(res.json(PlayStore)); //incorrect
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});