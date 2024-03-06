const jwt = require('jsonwebtoken');

const generarJWT = (uid = '', rol ='' , usuario='', nombre='') =>{

    return new Promise((resolve, reject)=>{
        
        const payload = {uid, rol, usuario, nombre};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '1d'
        }, (err, token)=>{

            if(err){
                console.log(err);
                reject('No se pudo generar el WebToken')
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generarJWT
}