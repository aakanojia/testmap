const express = require('express')
const router = express.Router()
const auth = require('../auth')
const MapController = require('../controllers/map-controller')

router.post('/Map', auth.verify, MapController.createMap);
router.delete('/Maps/:id', auth.verify, MapController.deleteMap);
router.get('/Maps', auth.verify, MapController.getMaps);
router.get('/Map/:id', auth.verify, MapController.getMapById)
router.get('/Mappairs', auth.verify, MapController.getMapPairs)
//router.get('/Maps', auth.verify, MapController.getMaps)
//router.put('/Map/:id', auth.verify, MapController.updateMap)

module.exports = router