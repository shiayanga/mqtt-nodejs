var mqtt = require('mqtt')

require('dotenv').config({ path: `../../dev.env` });

const mqtt_url = process.env.MQTT_ADDRESS;
console.log(`Connecting to ${mqtt_url}`);

var client = mqtt.connect(mqtt_url, {
    clientId: "lwt_test_monitor",
    clean: false,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
});
client.on("connect", function () {
    client.subscribe("lwt_test_client/status");
})
client.on("message", function (_,message) {
    var jsonPayload = JSON.parse(message.toString());
    console.log(`CLIENT IS ${jsonPayload.status}`);
})
