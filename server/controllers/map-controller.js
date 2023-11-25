const Map = require('../models/maps-model');
const User = require('../models/User');

createMap = (req, res) => {
    const body = { ...req.body, owner: req.user._id };

    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        });
    }

    const map = new Map(body);
    
    console.log("creating map: " + JSON.stringify(map));
    if (!map) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        });
    }

    map.save()
        .then(() => {
            return res.status(201).json({
                map: map
            });
        })
        .catch(error => {
            return res.status(400).json({
                errorMessage: 'Map Not Created!',
                error
            });
        });

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    // console.log("map created for " + req.userId);
    // User.findOne({ _id: req.userId }, (err, user) => {
    //     console.log("user found: " + JSON.stringify(user));
    //     user.map.push(map._id);
    //     user
    //         .save()
    //         .then(() => {
    //             map
    //                 .save()
    //                 .then(() => {
    //                     return res.status(201).json({
    //                         map: map
    //                     })
    //                 })
    //                 .catch(error => {
    //                     return res.status(400).json({
    //                         errorMessage: 'Map Not Created!'
    //                     })
    //                 })
    //         });
    // })
};

getMaps = async (req, res) => {
    try {
        const maps = await Map.find({ owner: req.user._id});
        if (!maps.length) {
            return res.status(404).json({ success: false, error: 'Maps not found' });
        }
        return res.status(200).json({ success: true, data: maps });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
};

deleteMap = async (req, res) => {
    const mapId = req.params.id;
    console.log("Deleting map with ID:", mapId);

    try {
        const map = await Map.findById(mapId);
        if (!map) {
            return res.status(404).json({
                errorMessage: 'Map not found!',
            });
        }

        await Map.findByIdAndDelete(mapId);
        console.log("Map deleted successfully");
        return res.status(200).json({ message: "Map deleted successfully" });
    } catch (error) {
        console.error("Error deleting map:", error);
        return res.status(500).json({
            errorMessage: 'Error deleting map',
            error,
        });
    }
}

module.exports = {
    createMap,
    getMaps,
    deleteMap
};