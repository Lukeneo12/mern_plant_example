/* eslint-disable require-jsdoc */
const logger = require('../../common/logger');
const PlantsRepository = require('../../domain/plants/plants.repository');
const plantsRepository = new PlantsRepository({logger});
const statusCodes = require('../../common/statusCodes');

async function getPlant(req, res) {
  logger.info('Getting a specific plant');
  const result = await plantsRepository.getPlant(req.params.plant_id);
  const httpStatusCode = statusCodes[result.code] || 500;
  res.status(httpStatusCode).json(result);
}

async function getPlants(req, res) {
  logger.info('Getting plants with filter');
  const result = await plantsRepository.getPlants(req.query);
  const httpStatusCode = statusCodes[result.code] || 500;
  res.status(httpStatusCode).json(result);
}

module.exports = {
  getPlant,
  getPlants,
};
