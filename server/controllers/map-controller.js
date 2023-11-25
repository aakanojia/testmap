const Map = require('../models/maps-model');
const User = require('../models/User');

createMap = (req, res) => {
    const body = req.body;
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

    // REMEMBER THAT OUR AUTH MIDDLEWARE GAVE THE userId TO THE req
    console.log("map created for " + req.userId);
    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        user.map.push(map._id);
        user
            .save()
            .then(() => {
                map
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            map: map
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Map Not Created!'
                        })
                    })
            });
    })
};
getMapById = async (req, res) => {
    console.log("Find Map with id: " + JSON.stringify(req.params.id));

    await Map.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found map: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, top5List: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}

getMapPairs = async (req, res) => {
    console.log("getMapPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Maps owned by " + email);
            await Top5List.find({ ownerEmail: email }, (err, maps) => {
                console.log("found Maps: " + JSON.stringify(maps));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!maps) {
                    console.log("!maps.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Maps not found' })
                }
                else {
                    console.log("Send the Map pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in maps) {
                        let list = maps[key];
                        let pair = {
                            _id: list._id,
                            name: list.name
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}

getMaps = async (req, res) => {
    try {
        const maps = await Map.find();
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
        const map = await Map.findOne({ _id: mapId, creatorID: req.userId });
        if (!map) {
            return res.status(404).json({
                errorMessage: 'Map not found or you do not have permission to delete this map!',
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
    getMapById,
    getMapPairs,
    getMaps,
    deleteMap
};