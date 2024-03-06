const dbalidators = require('./db-validators');
const generarJWT = require('./generar-jwt');

module.exports={
    ...dbalidators,
    ...generarJWT
}