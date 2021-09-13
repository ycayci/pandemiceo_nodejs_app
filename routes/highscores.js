const auth = require('../middleware/auth');
const { HighScore, validate } = require('../models/score');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res, next) => {

    const scores = await HighScore.find()
    res.send(scores);
});

router.get('/countries', async (req, res, next) => {
    const retrievedCountries = await HighScore.find().select('country -_id');
    let countries = [];
    retrievedCountries.map(key => countries.push(key.country));
    res.send(countries);
});

router.get('/:country', async (req, res) => {

    const score = await HighScore.find({ country: req.params.country });
    if (!score || score.length <= 0) return res.status(404).send('A score with the given country was not found.');
    res.send(score);

});

router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let score = new HighScore({
        country: req.body.country,
        week: req.body.week,
        nickname: req.body.nickname,
        herdImmunity: req.body.herdImmunity,
        healthcare: req.body.healthcare,
        prosperity: req.body.prosperity,
        economy: req.body.economy,
        death: req.body.death,
    })
    score = await score.save();
    res.send(score);

});

router.put('/:id', auth, async (req, res) => {
    //Look up the course
    //If not existing, return 404
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const score = await HighScore.findByIdAndUpdate(req.params.id, {
        country: req.body.country,
        week: req.body.week,
        nickname: req.body.nickname,
        herdImmunity: req.body.herdImmunity,
        healthcare: req.body.healthcare,
        prosperity: req.body.prosperity,
        economy: req.body.economy,
        death: req.body.death,
    }, {
        new: true
    });

    if (!score) return res.status(404).send('The score with the given ID was not found.');

    res.send(score);

});

router.delete('/:id', auth, async (req, res) => {

    const score = await HighScore.findByIdAndRemove(req.params.id);
    if (!score) return res.status(404).send('The score with the given ID was not found.');
    res.send(score);

});

module.exports = router;