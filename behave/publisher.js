const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://47.97.214.64:1893', {
    clientId: 'publisher',
    username: 'admin',
    password: 'admin123',
});

let message = {
    "v1": 4441,
    "v2": 4442,
    "v3": 4443,
    "v4": 4444,
    "v5": 4445,
    "v6": 4446,
    "v7": 4447,
    "V11": 3331,
    "V12": 3332,
    "V13": 3333,
    "V14": 3334,
    "V15": 3335,
    "V16": 3336,
    "V17": 3337,
    "V18": 3338,
    "V19": 3339,
    "V20": 3340
}

client.on('connect', function (connack) {
    if (connack.returnCode === 0) {

        setInterval(() => {
            client.publish(
                '/guangyin/data',
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
        }, 5000)
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