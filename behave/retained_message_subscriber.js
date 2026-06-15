let mqtt = require('mqtt');

let client = mqtt.connect('mqtt://39.101.69.217', {
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
