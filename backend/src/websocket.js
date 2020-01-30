const socketio = require('socket.io')

const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io
const connections = []

exports.setupWebsocket = (server) => {
    io = socketio(server)

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        })        
    })
}

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        const isNear = calculateDistance(coordinates, connection.coordinates) < 10
        const includesSomeTech = connection.techs.some(item => techs.includes(item))

        return (isNear && includesSomeTech)
    })
}

exports.sendMessage = (to, messageType, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(messageType, data)
    })
}
