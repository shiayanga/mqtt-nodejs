// 引入MQTT库
const mqtt = require('mqtt');

// 建立非持久会话的连接
const client = mqtt.connect('mqtt://broker.emqx.io', {
    clientId: 'mqtt_sample_id111_1',
    // clean: false
});

/**
 * 两个Client使用相同的Client Identifier进行连接时，如果第二个Client连接成功，Broker会关闭与第一个Client的连接
 * 因此，在实际应用中，一定要保证每一个设备使用的Client Identifier都是唯一的。
 */

client.on('connect', function (connack) {
    console.log('Connected to MQTT broker')
    console.log(`return code: ${connack.returnCode},0,sessionPresent: ${connack.sessionPresent}`)
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