const amqp = require('amqplib');

const queueName = "example-queue";

const send = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    Array.from({length: 2}, (_, i) => {
        const msg = i+1;
        console.log("[x] Publishing message %s, if the server faults all the message that are not ack will be stored", msg)
        channel.sendToQueue(queueName, Buffer.from(msg.toString()), { persistent: true });
    });
    
} 

send();
