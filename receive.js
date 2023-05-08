const amqp = require('amqplib');

const queueName = "example-queue";

const receive = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    channel.assertQueue(queueName, {durable: true});


    channel.consume(queueName, (msg) => {
        const content = msg.content.toString();
        console.log("[x] Received %s", content);
        if(parseInt(content) % 2 === 0){
            console.log("[x] Par number will procede the acknowledgment");
            channel.ack(msg);
        }else{
            console.log("[x] Impar number, will be discarded");
        }
    }, {
        noAck: false
    })
}

receive();
