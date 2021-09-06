/* eslint-disable require-jsdoc */
const db = require('../../infrastructure/db');
const collectionName = 'Plants';
const {v4: uuid} = require('uuid');

class PlantsRepository {
  constructor(options) {
    this.logger = options.logger;
  }
  async createPlant(plant) {
    this.logger.info('Creating a plant');
    try {
      plant.id = uuid();
      await db.createDocument(collectionName, plant);
    } catch (e) {
      this.logger.error(`Failed to create a plant. Error ${e.message}`);
      return {code: 'failed_to_create', error: e.message};
    }
    return {code: 'successfully_creation', plant: plant};
  }

  async getPlants(filters) {
    this.logger.info('Getting plants');
    let plants;
    try {
      plants = await db.getDocuments(collectionName, filters);
    } catch (e) {
      this.logger.error(`Failed to get plants. Error: ${e.message}`);
      return {code: 'failed_to_get', error: e.message};
    }
    return {code: 'successfully_get', plants};
  }

  async getPlant(plantId) {
    this.logger.info('Getting a plant');
    let plant;
    try {
      plant = await db.getDocument(collectionName, {id: plantId});
    } catch (e) {
      this.logger.error(`Failed to get plant. Error: ${e.message}`);
      return {code: 'failed_to_get', error: e.message};
    }
    return {code: 'successfully_get', plant};
  }

  async updatePlant(plantId, plant) {
    this.logger.info('Updating a plant');
    let plants;
    const set={};
    for (const key in plant) {
      if (plant[key] && plant[key] != '' &&
      plant[key] != null && plant[key] != undefined) {
        set[key] = plant[key];
      }
    }
    const updatedPlant = {
      '$set': set,
    };
    try {
      plants = await db.
          updateDocument(collectionName, {id: plantId}, updatedPlant);
    } catch (e) {
      this.logger.error(`Failed to update a plant. Error: ${e.message}`);
      return {code: 'failed_to_update', error: e.message};
    }
    return {code: 'successfully_updated', plants};
  }
  async deletePlant(plantId) {
    this.logger.info('Deleting a plant');
    let result;
    try {
      result = await db.deleteDocument(collectionName, {id: plantId});
    } catch (e) {
      this.logger.error(`Failed to delete a plant. Error: ${e.message}`);
      return {code: 'failed_to_delete', error: e.message};
    }
    return {code: 'successfully_deleted', result};
  }
}


module.exports = PlantsRepository;
