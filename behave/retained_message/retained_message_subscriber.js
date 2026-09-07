let mqtt = require('mqtt');
require('dotenv').config({ path: `../../dev.env` });

const mqtt_url = process.env.MQTT_ADDRESS;
console.log(`Connecting to ${mqtt_url}`);

var client = mqtt.connect(mqtt_url, {
    clientId: 'subscriber'
});


client.on('connect', function (connack) {
    if (connack.returnCode === 0) {
        if (connack.sessionPresent === false) {
            console.log('starting subscribe')
            client.subscribe('/retained/data',
                {qos: 1},
                function (err, granted) {
                    if (err !== null) {
                        console.log('subscribe failed')
                        client.end();
                    } else {
                        console.log(`subscribe succeeded with ${granted[0].topic},qos:${granted[0].qos}`)
                    }
                }
            )
        }else {
            console.log(`Connection failed:${connack.returnCode}`);
        }
    }
})

client.on('message',function (_,message,packet) {
    let jsonPayload = JSON.parse(message);
    console.log(`retained: ${packet.retain}`);
    console.log(`Received message:` + JSON.stringify(jsonPayload));
})
