const config={
    production:{
        SECRET:process.env.SECRET,
        DATABASE:process.env.MONGODB_URI
    },
    default:{
        SECRET:'SECRETKEYS',
        DATABASE:'mongodb://localhost:27017/bookSelf'
    }
}

exports.get=function get(env){
    return config[env] || config.default ;
}