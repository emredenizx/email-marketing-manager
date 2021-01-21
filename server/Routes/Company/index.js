const express = require('express')
const Router = express.Router();
const { db } = require('../../db/connection')
const { baseQuery } = require('./queryBuilders');

Router.get('/companies', async (req, res) => {
    try {
        const {
            sort,
            filters,
            search,
            paging
        } = req.query;

        const { orderBy, direction } = JSON.parse(sort);
        const { offset } = JSON.parse(paging);

        const companies = await baseQuery(search, filters)
            .clone()
            .select(
                'company.id',
                'company.name',
                'company.email',
                'company.created_at',
                'company.updated_at',
                'j1.name as citytown',
                'j2.name as county',
                'email_activities.event_name as event_name',
                'email_activities.event_type as event_type',
                'email_activities.processed_at as processed_at',
                db.raw("CASE WHEN global_unsubscribers.id IS NULL THEN false ELSE true END AS has_unsubscribed")
            )
            .orderBy(orderBy, direction)
            .limit('10')
            .offset(offset)

        const filterCount = await baseQuery(search, filters)
            .clone()
            .count('company.id')

        const count = await db('company').count('*');
        const size = count[0].count;
        const filterSize = await filterCount[0].count;

        res.send({
            companies: companies,
            count: size,
            filterCount: filterSize
        })
    } catch (error) {
        res.sendStatus(400);
    }
});

Router.post('/addcompany', async (req, res) => {
    try {
        const data = req.body;
        const date = new Date();
        const company = {
            ...data,
            created_at: date,
            updated_at: date
        }
        await db('company').returning('*').insert({ ...company })
        res.send('Succesfully Added!');
    } catch (error) {
        res.status(400).send(error);
    }
})

Router.delete('/deletecompany/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db('email_activity').returning('id').where('company_id', id).del();
        await db('company').returning('id').where('id', id).del();
        res.send('Succesfully Deleted!');
    } catch (error) {
        res.status(400).send('Unable to delete!')
    }
})

Router.patch('/editcompany/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const date = new Date();
        const company = {
            ...data,
            updated_at: date,
        }

        await db('company')
            .where({ id: id })
            .update({
                ...company
            }, ['*'])

        res.send('Succesfully Edited!');
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = Router;
