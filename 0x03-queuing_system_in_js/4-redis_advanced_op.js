import redis from 'redis';

// Create Redis client
const client = redis.createClient();

// Event listeners for connect and error events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Define the hash key and values
const hashKey = 'HolbertonSchools';
const hashValues = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

// Function to create the hash
const createHash = () => {
  Object.entries(hashValues).forEach(([field, value]) => {
    client.hset(hashKey, field, value, redis.print);
  });
};

// Function to display the hash
const displayHash = () => {
  client.hgetall(hashKey, (err, obj) => {
    if (err) {
      console.log(`Error retrieving hash: ${err.message}`);
    } else {
      console.log(obj);
    }
  });
};

// Create and display the hash
createHash();
displayHash();
