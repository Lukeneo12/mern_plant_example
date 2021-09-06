/* eslint-disable require-jsdoc */
const logger = require('../../common/logger');
const PlantsRepository = require('../../domain/plants/plants.repository');
const plantsRepository = new PlantsRepository({logger});
const statusCodes = require('../../common/statusCodes');

async function deletePlant(req, res) {
  logger.info('Deleting a plant');
  const result = await plantsRepository.deletePlant(req.params.plant_id);
  const httpStatusCode = statusCodes[result.code] || 500;
  res.status(httpStatusCode).json(result);
}

module.exports = {
  deletePlant,
};
