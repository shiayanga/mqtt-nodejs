const mqtt = require('mqtt');
require('dotenv').config({ path: `../../dev.env` });

const mqtt_url = process.env.MQTT_ADDRESS;
console.log(`Connecting to ${mqtt_url}`);

var client = mqtt.connect(mqtt_url, {
    clientId: 'guangyin2222',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
});

let message = {
    "V20": 3991
}

client.on('connect', function (connack) {
    if (connack.returnCode === 0) {

        // setInterval(() => {
            client.publish(
                '/guangyin2222/data',
                JSON.stringify(message),
                {qos: 1},
                function (error) {
                    if (error === null) {
                        console.log('------------------------------------');
                        console.log('Message published');
                    } else {
                        console.log("Publish Failed")
                        console.log(error)
                        client.end();
                    }
                })
        // }, 15000)
    } else {
        console.log(`Connection failed: ${connack.returnCode}`)
    }
})

client.on('error', function (err) {
    console.log(err)
    console.error('Connection error:', err.message)
    client.end()
})

client.on('offline', function () {
    console.log('Client is offline')
})

client.on('close', function () {
    console.log('Connection closed')
})
