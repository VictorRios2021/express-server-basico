const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_DB_URL);

        console.log('Data base Online')
    } catch (error){
        console.log(error)
        throw new Error('Error DB')
    }
}

module.exports = {
    dbConection
}
