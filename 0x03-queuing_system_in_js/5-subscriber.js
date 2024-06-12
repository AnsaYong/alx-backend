import redis from 'redis';

// Create Redis client
const subscriber = redis.createClient();

// Event listeners for connect and error events
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
subscriber.subscribe('holberton school channel');

// Event listener for receiving messages
subscriber.on('message', (channel, message) => {
  console.log(`Received message: ${message}`);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel');
    subscriber.quit();
  }
});
