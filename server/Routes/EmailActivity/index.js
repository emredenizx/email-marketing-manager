const express = require('express')
const Router = express.Router();
const csvToJson = require('csvtojson');
const { db } = require('../../db/connection')
const path = require('path');
const fs = require('fs');

Router.post('/upload/emailactivity', async (req, res) => {
    try {
        if (!req.files) {
            return res.status(500).send({ msg: 'File is not found' })
        }
        const file = req.files.file;

        const uploadPath = path.resolve(__dirname + '/../../activity-reports');

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath)
        }

        await file.mv(`${uploadPath}/${file.name}`)

        const csvFile = path.resolve(__dirname, '..', '..', 'activity-reports', `./${file.name}`)
        const data = await csvToJson().fromFile(`${csvFile}`);

        const fileName = file.name.split('.')[0]
        const jsonFile = path.resolve(__dirname, '..', '..', 'activity-reports', `./${fileName}.json`)

        fs.writeFileSync(jsonFile, JSON.stringify(data));
        res.send(file.name)

    } catch (error) {
        res.status(400).send(error);
    }
});

Router.post('/process/emailactivities', async (req, res) => {
    try {
        const fileName = req.body.file
        const jsonFile = path.resolve(__dirname, '..', '..', 'activity-reports', `./${fileName}.json`)

        const data = fs.readFileSync(jsonFile);
        const file = JSON.parse(data);

        for (let activity of file) {
            const singlesend_id = JSON.parse(activity.unique_args).singlesend_id;

            const {
                event,
                attempt,
                processed,
                email,
                reason,
                type
            } = activity

            if (event === 'deferred' && attempt > 1) {
                continue;
            }

            const company = await db('company')
                .returning('*')
                .where({
                    'email': email
                }).select('id')

            if (company.length === 0) {
                continue;
            }

            const company_id = company[0].id;
            const email_sends = await db('email_sends')
                .returning('*')
                .where({
                    'id': singlesend_id
                })
                .select('id')
            const email_sends_id = email_sends[0].id

            await db('email_activity')
                .returning('event_name')
                .insert({
                    'event_name': event,
                    'processed_at': new Date(processed),
                    'event_type': type,
                    'event_reason': reason,
                    'company_id': company_id,
                    'email_sends_id': email_sends_id
                })
                .onConflict(['company_id', 'email_sends_id', 'event_name', 'event_type', 'event_reason', 'processed_at'])
                .ignore()
        }

        const reports = path.resolve(__dirname, '..', '..', 'activity-reports')
        fs.rmdirSync(reports, { recursive: true })
        res.send('Process Complete!')

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = Router;
