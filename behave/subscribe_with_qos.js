// 新版yargs: 推荐将初始化和读取写在一起
let args = require('yargs/yargs')(process.argv.slice(2)).argv;
let mqtt = require('mqtt')
let client = mqtt.connect('mqtt://localhost',
    {
        clientId: "mqtt_sample_subscriber_id_2",
        clean: false
    })

client.on('connect', function (connack) {
    if (connack.returnCode === 0) {
        // 注意：这里的qos参数需要转换为数字
        // 在 JavaScript 中，从命令行传进来的参数，有时会被识别为字符串（比如 "2" 而不是 2）。
        // 当 mqtt 库发现你传入的 qos 不是标准的数字类型，或者不符合它的预期时，
        // 它在底层会直接报错或静默失败，导致订阅（.subscribe()）根本没有发送出去。
        let param = parseInt(args.qos, 10);
        console.log(param)
        client.subscribe("/topic/qos", {qos: param}, function () {
            client.on('packetsend', function (packet) {
                console.log(`send: ${packet.cmd}`)
            })
            client.on('packetreceive', function (packet) {
                console.log(`receive: ${packet.cmd}`)
            })
        })
    } else {
        console.log(`Connection failed: ${connack.returnCode}`)
    }
})