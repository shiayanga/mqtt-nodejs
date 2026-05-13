// 引入MQTT库
const mqtt = require('mqtt');

// 建立持久会话的连接
const client = mqtt.connect('mqtt://broker.emqx.io', {
    clientId: 'mqtt_sample_id1111_1',
    clean: false
});


client.on('connect', function (connack) {
    console.log('Connected to MQTT broker')
    console.log(`return code: ${connack.returnCode},sessionPresen: ${connack.sessionPresent}`)
    client.end()
})

client.on('error', function(err) {
    console.error('Connection error:', err.message)
    client.end()
})

client.on('offline', function() {
    console.log('Client is offline')
})

client.on('close', function() {
    console.log('Connection closed')
})