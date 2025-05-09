const {
    getAllDestinations: getAllDestinationsQuery,
    getDestinationById: getDestinationByIdQuery,
    createDestination: createDestinationQuery,
    updateDestination: updateDestinationQuery,
    deleteDestination: deleteDestinationQuery,
    searchDestinations: searchDestinationsQuery,
    updateDestinationImageUrl: updateDestinationImageUrlQuery,
    updateDestinationDetails: updateDestinationDetailsQuery,
} = require('../queries/destinationsQueries');
const generateEmbedding  = require('../utils/generateEmbedding');

// Get all destinations
const getAllDestinations = async (req, res) => {
    try {
        const destinations = await getAllDestinationsQuery();
        res.status(200).json(destinations);
    } catch (error) {
        console.error('Error getting all destinations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get destination by ID
const getDestinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await getDestinationByIdQuery(id);
        if (destination) {
            res.status(200).json(destination);
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error getting destination by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new destination
const createDestination = async (req, res) => {
    try {
        const newDestination = await createDestinationQuery(req.body);
        res.status(201).json({destination: newDestination });
    } catch (error) {
        console.error('Error creating destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update destination
const updateDestination = async (req, res) => {
    try {
        const updatedDestination = await updateDestinationQuery(req.body);
        if (updatedDestination) {
            res.status(200).json({ destination: updatedDestination });
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error updating destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete destination
const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDestination = await deleteDestinationQuery(id);
        if (deletedDestination) {
            res.status(200).json({ message: 'Destination deleted successfully' });
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error deleting destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const searchDestinations = async (req, res) => {
    try {
        const { query } = req.body;
        const queryEmbedding = await generateEmbedding(query);
        const results = await searchDestinationsQuery(queryEmbedding);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching destinations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateDestinationImageUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url } = req.body;

        const updatedDestination = await updateDestinationImageUrlQuery(id, image_url);

        if (updatedDestination) {
            res.status(200).json(updatedDestination);
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error updating destination image URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateDestinationDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { details } = req.body;

        const updatedDestination = await updateDestinationDetailsQuery(id, details);

        if (updatedDestination) {
            res.status(200).json(updatedDestination);
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error updating destination image URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    searchDestinations,
    updateDestinationImageUrl,
    updateDestinationDetails
};