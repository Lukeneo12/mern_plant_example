const {MongoClient} = require('mongodb');
const logger = require('../common/logger');
const url = require('url');

const mongoProtocol = 'mongodb+srv://' || '';
const user = process.env.USER || '';
const password = process.env.PASSWORD || '';
const hostDB = process.env.HOSTDB || '';
const dbName = process.env.DB_NAME;
// eslint-disable-next-line
const uri = url.format(`${mongoProtocol}${user}:${password}@${hostDB}/${dbName}?retryWrites=true&w=majority`);
const client = new MongoClient(uri,
    {useNewUrlParser: true, useUnifiedTopology: true});
let dbSelection;


/**
 * Create connection at mongoDB
 * @param {string} collectionName
 * @param {object} payloadDocument
 * @return {object}
 */
async function createConnection() {
  try {
    await client.connect();
    logger.info('Connection successful');
    logger.info(`DB Selected ${dbName}`);
    return client.db(dbName);
  } catch (e) {
    logger.error(`Failed to create the connection with db ${e.message}`);
    throw e;
  }
}


/**
 * Create a document at mongoDB Collection
 * @param {string} collectionName
 * @param {object} payloadDocument
 * @return {object}
 */
async function createDocument(collectionName, payloadDocument) {
  dbSelection = await createConnection();
  logger.info(`Creating a document at collection ${collectionName}`);
  let documentCreated;
  try {
    documentCreated = await dbSelection.collection(collectionName)
        .insertOne(payloadDocument);
    logger.info('Creation of document successfully');
  } catch (e) {
    logger.error(`Failed to create a document
        at collection ${collectionName} with error ${e.message}`);
    throw e;
  }
  return documentCreated;
}

/**
 * Create a document at mongoDB Collection
 * @param {string} collectionName
 * @param {string} query
 * @return {object}
 */
async function getDocument(collectionName, query) {
  dbSelection = await createConnection();
  logger.info(`Getting a document at collection ${collectionName}`);
  let documentSelected;
  try {
    documentSelected = await dbSelection.collection(collectionName)
        .findOne(query);
    logger.info('Document found successfully');
  } catch (e) {
    logger.error(`Failed to get a document
          at collection ${collectionName} with error ${e.message}`);
    throw e;
  }
  return documentSelected;
}

/**
 * Create a document at mongoDB Collection
 * @param {string} collectionName
 * @param {object} filters
 * @return {object}
 */
async function getDocuments(collectionName, filters) {
  dbSelection = await createConnection();
  logger.info(`Gettings documents at collection ${collectionName}`);
  let documentCreated;
  try {
    documentCreated = await dbSelection.collection(collectionName)
        .find(filters).toArray();
    logger.info('Documents found successfully');
  } catch (e) {
    logger.error(`Failed to find documents
          at collection ${collectionName} with error ${e.message}`);
    throw e;
  }
  return documentCreated;
}

/**
 * Create a document at mongoDB Collection
 * @param {string} collectionName
 * @param {object} query
 * @param {object} payloadDocument
 * @return {object}
 */
async function updateDocument(collectionName, query, payloadDocument) {
  dbSelection = await createConnection();
  logger.info(`Updating a document at collection ${collectionName}`);
  let documentUpdated;
  try {
    documentUpdated = await dbSelection.collection(collectionName)
        .updateOne(query, payloadDocument);
    logger.info('Updating a document successfully');
  } catch (e) {
    logger.error(`Failed to update a document
          at collection ${collectionName} with error ${e.message}`);
    throw e;
  }
  return documentUpdated;
}

/**
 * Create a document at mongoDB Collection
 * @param {string} collectionName
 * @param {object} query
 * @return {object}
 */
async function deleteDocument(collectionName, query) {
  dbSelection = await createConnection();
  logger.info(`Deleting a document at collection ${collectionName}`);
  let documentCreated;
  try {
    documentCreated = await dbSelection.collection(collectionName)
        .deleteOne(query);
    logger.info('Document deleted successfully');
  } catch (e) {
    logger.error(`Failed to delete a document
          at collection ${collectionName} with error ${e.message}`);
    throw e;
  }
  return documentCreated;
}

module.exports = {
  createConnection,
  createDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
};
