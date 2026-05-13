const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883', {
    clientId: 'publisher'
});

let message = {
    current: 25
}

client.on('connect', function (connack) {
    if (connack.returnCode === 0) {
        client.publish(
            '/mqttjs_test_shiayanga/topic1',
            JSON.stringify(message),
            {qos: 1},
            function (error) {
                if (error === null) {
                    console.log('Message published');
                    client.end();
                } else {
                    console.log("Publish Failed")
                    console.log(error)
                    client.end();
                }
            })
    } else {
        console.log(`Connection failed: ${connack.returnCode}`)
    }
})

client.on('error', function(err) {
    console.log(err)
    console.error('Connection error:', err.message)
    client.end()
})

client.on('offline', function() {
    console.log('Client is offline')
})

client.on('close', function() {
    console.log('Connection closed')
})