const http = require('http')
require('dotenv').config({ path: `../../dev.env` });



const clientId = process.env.EMQX_CLIENT_ID
const apiKey = process.env.EMQX_API_KEY
const apiSecret = process.env.EMQX_API_SECRET

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

const options = {
    hostname: process.env.EMQX_HOST,
    port: 18093,
    path: `/api/v5/clients/${clientId}`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`
    }
}

const req = http.request(options, (res) => {
    let data = ''
    res.on('data', chunk => data += chunk)
    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log(`[ONLINE] ${clientId}`)
            console.log(JSON.stringify(JSON.parse(data), null, 2))
        } else if (res.statusCode === 404) {
            console.log(`[OFFLINE] ${clientId}`)
            console.log(JSON.stringify(JSON.parse(data), null, 2))
        } else {
            console.log(`[ERROR] ${res.statusCode} ${data}`)
            console.log(JSON.stringify(JSON.parse(data), null, 2))
        }
    })
})

req.on('error', err => console.error(err.message))
req.end()
