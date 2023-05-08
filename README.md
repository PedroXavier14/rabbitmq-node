### RabbitMQ

# Prerequisites
- Install rabbitmq server, you can use homebrew to handle all the installation process (https://www.rabbitmq.com/install-homebrew.html)

# How to run
- npm install
- npm run dev:send (to start publisher)
- npm run dev:receive (to start consumer)

# Note
If the server goes down all the message that doesn't received manual ack will be stored and will be ready to be consumed again

