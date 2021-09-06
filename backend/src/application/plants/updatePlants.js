/* eslint-disable require-jsdoc */
const logger = require('../../common/logger');
const PlantsRepository = require('../../domain/plants/plants.repository');
const plantsRepository = new PlantsRepository({logger});
const statusCodes = require('../../common/statusCodes');

async function updatePlant(req, res) {
  logger.info('Updating a plant');
  const result = await plantsRepository
      .updatePlant(req.params.plant_id, req.body);
  const httpStatusCode = statusCodes[result.code] || 500;
  res.status(httpStatusCode).json(result);
}

module.exports = {
  updatePlant,
};
