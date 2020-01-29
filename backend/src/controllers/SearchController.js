const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query
        
        const techsArray = parseStringAsArray(techs)
        
        const rangeInMeters = 10000

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: rangeInMeters
                },
            },
        })

        return response.json(devs)
    }
}