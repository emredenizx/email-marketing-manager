const express = require('express')
const Router = express.Router();
const { db } = require('../../db/connection')


Router.get('/counties', async (req, res) => {
    try {
        const data = await db('county')
            .select(
                'id',
                'name'
            )
            .orderBy('name', 'asc')

        res.send(data)
    } catch (error) {
        res.status(400).send(error);
    }
});

Router.get('/counties/:countyId', async (req, res) => {
    const countyId = req.params.countyId;
    try {
        const data = await db('citytown')
            .select(
                'id',
                'name'
            )
            .where("county_id", countyId)
            .orderBy('name', 'asc')

        res.send(data)
    } catch (error) {
        res.status(400).send(error);
    }
});

Router.post('/addcounty', async (req, res) => {
    try {
        const county = req.body.county
        await db('county').returning('id').insert({ 'name': county })
        res.send('Succesfully Added!');
    } catch (error) {
        res.status(400).send(error);
    }
})

Router.post('/addcitytown', async (req, res) => {
    try {
        const { citytown, county_id } = req.body
        await db('citytown')
            .returning('id')
            .insert({ 'name': citytown, 'county_id': county_id })
        res.send('Succesfully Added!');
    } catch (error) {
        res.status(400).send(error);
    }
})

Router.patch('/editcounty/:id', async (req, res) => {

    const id = req.params.id;
    const county = req.body.county;

    try {
        await db('county')
            .where({ id: id })
            .update({
                'name': county
            }, ['id'])
        res.send('Succesfully Edited!');
    } catch (error) {
        res.status(400).send(error);
    }
})

Router.patch('/editcitytown/:id', async (req, res) => {
    const id = req.params.id;
    const citytown = req.body.citytown

    try {
        await db('citytown')
            .where({ id: id })
            .update({
                'name': citytown
            }, ['id'])
        res.send('Succesfully Edited!');
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = Router;
