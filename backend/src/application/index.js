const express = require('express');
// eslint-disable-next-line
const mernRoutes = express.Router();
const {createPlant,
  getPlant,
  getPlants,
  updatePlant,
  deletePlant} = require('./plants');

mernRoutes.route('/api/plants').post(createPlant);
mernRoutes.route('/api/plants').get(getPlants);

mernRoutes.route('/api/plants/:plant_id').get(getPlant);
mernRoutes.route('/api/plants/:plant_id').put(updatePlant);
mernRoutes.route('/api/plants/:plant_id').delete(deletePlant);

module.exports = mernRoutes;
