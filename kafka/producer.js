const { Kafka } = require('kafkajs')
require('dotenv').config({ path: `../../dev.env` });

var kafka_brokers = process.env.KAFKA_BROKERS;

const kafka = new Kafka({
  clientId: 'mqtt-nodejs-producer',
  brokers: kafka_brokers,
})

const producer = kafka.producer()

async function main() {
  await producer.connect()
  const result = await producer.send({
    topic: 'kafkaTopicTest',
    messages: [{ value: JSON.stringify({ name: 'test', timestamp: Date.now() }) }],
  })
  console.log('Message sent:', result)
  await producer.disconnect()
}

main().catch((err) => {
  console.error('Error:', err)
  producer.disconnect()
})
