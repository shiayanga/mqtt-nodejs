const { Kafka } = require('kafkajs')
require('dotenv').config({ path: `../../dev.env` });

var kafka_brokers = process.env.KAFKA_BROKERS;

const kafka = new Kafka({
  clientId: 'mqtt-nodejs-subscriber',
  brokers: kafka_brokers,
})

const consumer = kafka.consumer({ groupId: 'mqtt-nodejs-group-subscriber' })

async function main() {
  await consumer.connect()
  console.log('Subscriber connected to Kafka')

  await consumer.subscribe({ topic: 'kafkaTopic', fromBeginning: false })
  console.log('Subscribed to topic: kafkaTopic')

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const timestamp = new Date().toISOString()
      console.log(`[${timestamp}] Topic: ${topic}, Partition: ${partition}, Message: ${message.value.toString()}`)
    },
  })
}

main().catch((err) => console.error('Subscriber Error:', err))
