const mongoose = require('mongoose');
const Joi = require('joi');

const HighScore = mongoose.model('HighScores', new mongoose.Schema({
    country: { type: String, required: true },
    week: { type: Number, required: true },
    nickname: { type: String, required: true },
    herdImmunity: {
        type: Number, required: true,
        min: 0,
        max: 100
    },
    healthcare: {
        type: Number, required: true,
        min: 0,
        max: 100
    },
    prosperity: {
        type: Number, required: true,
        min: 0,
        max: 100
    },
    economy: {
        type: Number, required: true,
        min: 0,
        max: 100
    },
    death: { type: Number, required: true },
}));

function validateScores(score) {
    const schema = Joi.object({
        country: Joi.string().required(),
        week: Joi.number().required(),
        nickname: Joi.string().required(),
        herdImmunity: Joi.number().required(),
        healthcare: Joi.number().required(),
        prosperity: Joi.number().required(),
        economy: Joi.number().required(),
        death: Joi.number().required(),
    });
    return schema.validate(score);
}

module.exports.HighScore = HighScore;
module.exports.validate = validateScores;