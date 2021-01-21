const express = require('express')
const Router = express.Router();
const fetch = require('node-fetch');
const { db } = require('../../db/connection');

Router.get('/unsubscribes', async (req, res) => {
    try {

        const url = 'https://api.sendgrid.com/v3/suppression/unsubscribes'

        const data = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${process.env.SENDGRID_API_KEY} `,
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        )       

        const unsubscribes = await data.json();     

        for (let company of unsubscribes) {
            const company_id = await db('company')
                .returning('id')
                .where({
                    'email': company.email
                }).select('id')
           
            if (company_id[0]) {
                await db('unsubscribes')
                    .returning('id')
                    .insert({
                        'company_id': company_id[0].id,
                        'created_at': new Date(company.created * 1000)
                    })
                    .onConflict('company_id')
                    .ignore()
            }
        }

        res.send('Unsubscribers Updated!');

    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = Router;
