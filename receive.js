const amqp = require("amqplib");

const exchange = "my-exchange";
const queue = "my-queue";
const routingKey = "my-routing-key";

const receive = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    channel.assertExchange(exchange, "direct", { durable: true });
    channel.assertQueue(queue, { durable: true });
    channel.bindQueue(queue, exchange, routingKey);
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log("Received a message:", msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("Error connect to RabbitMQ", error);
  }
};

const run = async () => {
  try {
    await receive();
  } catch (error) {
    console.log(error.message);
  }
};

run();
