export const MOCK_COMPANIES_DATA = {
    "companies": [
        {
            "id": "1aa8117b-62cb-4e10-9a10-85e9f2cade71",
            "name": "Company Super",
            "email": "companysuper@example.com",
            "created_at": "2021-01-07T03:09:26.845Z",
            "updated_at": "2021-01-07T03:09:26.845Z",
            "citytown": "City of St Albans",
            "county": "Hertfordshire",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "f6c7f817-a7df-492f-a102-75b2e27183e1",
            "name": "Company Duper",
            "email": "companyduper@example.com",
            "created_at": "2021-01-06T18:09:16.900Z",
            "updated_at": "2021-01-06T18:09:16.900Z",
            "citytown": "Guildford",
            "county": "Surrey",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "50582cda-8596-4d7d-b433-ab7d5e8748c4",
            "name": "Best Company",
            "email": "companybest@example.com",
            "created_at": "2021-01-06T01:25:36.804Z",
            "updated_at": "2021-01-06T01:25:36.804Z",
            "citytown": "Amersham",
            "county": "Buckinghamshire",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "8396c15c-f482-41c1-8747-e126b45bfb65",
            "name": "Fine Company",
            "email": "companyfine@example.com",
            "created_at": "2021-01-06T01:25:20.549Z",
            "updated_at": "2021-01-06T01:25:20.549Z",
            "citytown": "Amersham",
            "county": "Buckinghamshire",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "eea9fdee-0bdb-45d7-9e60-da9ffe94ce2f",
            "name": "Very Architecture Company",
            "email": "veryarchitecturecompany@example.com",
            "created_at": "2021-01-05T23:02:57.716Z",
            "updated_at": "2021-01-05T23:02:57.716Z",
            "citytown": "Taunton",
            "county": "Somerset",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "6297f206-b5ec-4ce1-9863-7466c7d28e1d",
            "name": "Simple Company",
            "email": "simplecompany@example.com",
            "created_at": "2021-01-05T23:02:49.119Z",
            "updated_at": "2021-01-05T23:02:49.119Z",
            "citytown": "Taunton",
            "county": "Somerset",
            "event_name": "bounce",
            "event_type": "blocked",
            "processed_at": "2020-12-15T12:23:18.000Z",
            "has_unsubscribed": true
        },
        {
            "id": "9cc52e9a-1a81-4519-8214-0d6b42dcc5bd",
            "name": "Interesting Company",
            "email": "interesting@example.com",
            "created_at": "2021-01-05T22:52:41.037Z",
            "updated_at": "2021-01-05T22:52:41.037Z",
            "citytown": "Sedgemoor",
            "county": "Somerset",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "55bcb30c-e5c1-4aab-a19b-d6800321a2f9",
            "name": "company",
            "email": "company@example.com",
            "created_at": "2021-01-05T22:52:13.182Z",
            "updated_at": "2021-01-05T22:52:13.182Z",
            "citytown": "Sedgemoor",
            "county": "Somerset",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        },
        {
            "id": "47546c19-0a06-4f24-ab86-c85600a9cd99",
            "name": "Well Company",
            "email": "wellcompany@example.com",
            "created_at": "2021-01-05T21:35:39.082Z",
            "updated_at": "2021-01-05T21:35:39.082Z",
            "citytown": "Runnymede",
            "county": "Surrey",
            "event_name": "delivered",
            "event_type": "",
            "processed_at": "2020-12-15T12:23:18.000Z",
            "has_unsubscribed": false
        },
        {
            "id": "c3e2aaa7-acbb-403b-8a6b-b07169a3cd61",
            "name": "It is Company",
            "email": "itiscompany@example.com",
            "created_at": "2021-01-05T20:17:50.208Z",
            "updated_at": "2021-01-05T20:17:50.208Z",
            "citytown": "Runnymede",
            "county": "Surrey",
            "event_name": null,
            "event_type": null,
            "processed_at": null,
            "has_unsubscribed": false
        }
    ],
    "count": "1358",
    "filterCount": "1358"
}

const MOCK_TABLECOLUMNS = [
    { label: "City/Town", name: "citytown", value: true },
    { label: "County", name: "county", value: true },
    { label: "Last Event", name: "event_name", value: true },
    { label: "Event Type", name: "event_type", value: false },
    { label: "Processed At", name: "event_processed_at", value: false },
    { label: "Global Unsubscribes", name: "has_unsubscribed", value: false },
]

export const MOCK_CONTEXT = {
    data: MOCK_COMPANIES_DATA,
    params: {
        sort: {
            orderBy: 'created_at',
            direction: 'desc'
        },
        paging: {
            itemPerPage: 10,
            pageIndex: 1,
            offset: 0
        }
    },
    isLoading: false,
    paging: 1,
    columns: MOCK_TABLECOLUMNS,
    setModal: jest.fn()
}

