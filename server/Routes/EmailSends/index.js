const express = require('express')
const Router = express.Router();
const fetch = require('node-fetch');
const { db } = require('../../db/connection')

Router.get('/emailsends', async (req, res) => {
    try {
        const {
            companyId
        } = req.query;

        let response =  [] ;

        const email_sends = await db('email_activity')
            .max('id as rank')
            .select('email_sends_id')
            .where('company_id', companyId)
            .groupBy('email_sends_id')
            .orderBy('rank', 'asc')

        if (email_sends.length > 0) {
            const sends_list = email_sends.map(send => send.email_sends_id)
            const sends = await db('email_sends')
                .select(
                    'id',
                    'name',
                    'created_at'
                )
                .whereIn('id', sends_list)
                .orderBy('created_at', 'desc')

            response =  sends;
            
        }
        res.send(response)
    } catch (error) {
        res.status(400).send(error);
    }
});

Router.get('/singlesend', async (req, res) => {
    try {
        const {
            companyId,
            sendId
        } = req.query;

        const data = await db('email_activity')
            .select(
                'id',
                'event_name',
                'event_type',
                'event_reason',
                'processed_at'
            )
            .where('company_id', companyId)
            .andWhere('email_sends_id', sendId)
            .orderBy('id', 'asc')

        res.send(data)
    } catch (error) {
        res.status(400).send(error);
    }
});

Router.get('/refresh/singlesends', async (req, res) => {
    try {
        const url = 'https://api.sendgrid.com/v3/marketing/singlesends'

        const data = await fetch(url,
            {
                method: 'GET',
                headers: {
                    // eslint-disable-next-line no-undef
                    "Authorization": `Bearer ${process.env.SENDGRID_API_KEY} `,
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )

        const response = await data.json();
        const singlesends = response.result;

       for (let send of singlesends) {
            await db('email_sends')
                .returning('id')
                .insert({
                    'id': send.id,
                    'name': send.name,
                    'created_at': new Date(send.created_at)
                })
                .onConflict('id')
                .ignore()
        }

        res.send("Single Send List Refreshed")
    } catch (error) {
        res.status(400).send({
            error: 'Failed to refresh!'
        });
    }
});

module.exports = Router;
