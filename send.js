const amqp = require("amqplib");

const exchange = "my-exchange";
const message = { message: "Hello, world!" };
const routingKey = "my-routing-key";

const send = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", { durable: true });
    await channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    console.log("Message sent:", message);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
  }
};

send();
