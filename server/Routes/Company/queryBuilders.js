const { db } = require('../../db/connection')

const withFilters = (qb, params) => {
    if (params) {
        const { email_activity, location } = JSON.parse(params)
        qb
            .modify(byEmailActivity, email_activity)
            .modify(byLocation, location)
    } else {
        return;
    }
}

const byEmailActivity = (qb, emailActivity) => {   
    if (emailActivity === 'all') {
        return;
    }
    else if (emailActivity) {
        if (emailActivity === 'unsent') {
            qb
                .where('event_name', null)
                .andWhere('global_unsubscribers.id', null)

        } else if (emailActivity === 'has_unsubscribed') {
            qb
                .whereNotNull('global_unsubscribers.id')
        }
        else {
            qb
                .whereIn('event_name', emailActivity)
        }
    } else {
        return;
    }
}

const byLocation = (qb, location) => {
    if (location) {
        const { citytown_id, county_id } = location
        qb
            .modify(byCitytown, citytown_id)
            .modify(byCounty, county_id)
    }
}

const byCounty = (qb, county_id) => {
    if (county_id)
        qb.whereIn('company.citytown_id', function () {
            this.select('id').from('citytown').where('county_id', county_id);
        })
}

const byCitytown = (qb, citytown_id) => {
    if (citytown_id)
        qb.whereIn('company.citytown_id', function () {
            this.select('id').from('citytown').where('id', citytown_id);
        })
}

const withSearch = (qb, params) => {
    if (params) {
        const { name, email } = JSON.parse(params)
        qb
            .andWhere('company.name', 'ilike', `%${name}%`)
            .andWhere('company.email', 'ilike', `%${email}%`,)
    }
}

const baseQuery = (search, filters) => db('company')
    .join('citytown as j1', 'j1.id', 'company.citytown_id')
    .join('county as j2', 'j2.id', 'j1.county_id')
    .leftJoin(
        db('email_activity')
            .distinct('id', 'recent_activity.company_id', 'recent_activity.rank', 'event_name', 'event_type', 'processed_at')
            .innerJoin(
                db('email_activity')
                    .max('id as rank')
                    .select('company_id')
                    .groupBy('company_id')
                    .as('recent_activity'),
                'email_activity.company_id',
                'recent_activity.company_id'
            )
            .whereRaw('email_activity.id = recent_activity.rank')
            .as('email_activities'),
        'company.id',
        'email_activities.company_id'
    )
    .leftJoin('unsubscribes as global_unsubscribers', 'global_unsubscribers.company_id', 'company.id')
    .modify(withSearch, search)
    .modify(withFilters, filters)

module.exports = {
    baseQuery,
    withSearch,
    withFilters
}

