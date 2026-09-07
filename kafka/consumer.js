const { Kafka } = require('kafkajs')
require('dotenv').config({ path: `../../dev.env` });

var kafka_brokers = process.env.KAFKA_BROKERS;

const kafka = new Kafka({
  clientId: 'mqtt-nodejs-consumer',
  brokers: kafka_brokers,
})

const consumer = kafka.consumer({ groupId: 'mqtt-nodejs-group' })

async function main() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'kafkaTopicTest', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received:', message.value.toString())
    },
  })
}

main().catch((err) => console.error('Error:', err))
