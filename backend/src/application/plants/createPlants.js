/* eslint-disable require-jsdoc */

const logger = require('../../common/logger');
const PlantsRepository = require('../../domain/plants/plants.repository');
const plantsRepository = new PlantsRepository({logger});
const statusCodes = require('../../common/statusCodes');

async function createPlant(req, res) {
  logger.info('Creating a plant controller');
  const result = await plantsRepository.createPlant(req.body);
  const httpStatusCode = statusCodes[result.code] || 500;
  res.status(httpStatusCode).json(result);
}

module.exports = {
  createPlant,
};
