var mqtt = require('mqtt')
require('dotenv').config({ path: `../../dev.env` });

const mqtt_url = process.env.MQTT_ADDRESS;
console.log(`Connecting to ${mqtt_url}`);

var client = mqtt.connect(mqtt_url, {
    clientId: "lwt_test_client",
    clean: false,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    // LWT 设置
    will: {
        topic: "lwt_test_client/status",
        qos: 1,
        retain: true,
        payload: JSON.stringify({
            status: "offline"
        })
    }
});
client.on("connect", function (connack) {
    console.log("connecting...");
    if (connack.returnCode == 0) {
        console.log("connected");
        client.publish("lwt_test_client/status",
            JSON.stringify({
                status: "online",
            }),
            {
                qos: 1,
                retain: true,
            }
        )
    }else {
        console.log(`Connection failed: ${connack.returnCode}`);
    }
})
