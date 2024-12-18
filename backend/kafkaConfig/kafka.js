// kafka.js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'collaborative-editor',
    brokers: ['localhost:9093'], // Adjust according to your Kafka setup
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'collaborative-editors-group' });

const initKafka = async (io) => { // Pass io to handle WebSocket emissions
    await producer.connect();
    console.log("Kafka Producer connected");

    await consumer.connect();
    console.log("Kafka Consumer connected");

    await consumer.subscribe({ topic: 'document-edits', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const edit = JSON.parse(message.value.toString());
            // Emit the edit to all connected clients through WebSocket
            io.emit('documentUpdate', edit); // Ensure io is available here
        },
    });
};

const sendEdit = async (edit) => {
    await producer.send({
        topic: 'document-edits',
        messages: [
            { value: JSON.stringify(edit) },
        ],
    });
};

module.exports = { initKafka, sendEdit, producer, consumer };
