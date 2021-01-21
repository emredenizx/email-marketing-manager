const express = require('express')
const Router = express.Router();
const { db } = require('../../db/connection')
const { Parser } = require('json2csv')
const { baseQuery } = require('../Company/queryBuilders');
const { getSelectedLocations, getSelectedActivities } = require('./utils');

// eslint-disable-next-line no-undef
Router.get('/exportcsv', async (req, res) => {
    try {
        const {
            sort,
            search,
            filters,
        } = req.query;

        const { orderBy, direction } = JSON.parse(sort);
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
                db.raw("CASE WHEN global_unsubscribers.id IS NULL THEN 'true' ELSE 'false' END AS has_unsubscribed")
            )
            .orderBy(orderBy, direction)

        const selectedFilters = filters ? JSON.parse(filters) : null

        const selectedActivities = filters ? getSelectedActivities(selectedFilters) : 'All Companies'
        const selectedLocation = filters ? getSelectedLocations(selectedFilters) : 'All Locations'      

        const firstRecordDate = companies[0].created_at
        const lastRecordDate = companies[companies.length - 1].created_at

        const json2csv = new Parser();
        const csv = json2csv.parse(companies);

        res.header('Content-Type', 'text/csv');
        return res.send({
            csv,
            firstRecordDate,
            lastRecordDate,
            selectedActivities,
            selectedLocation
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = Router;
