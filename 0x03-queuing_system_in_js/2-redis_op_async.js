import redis from 'redis';
import { promisify } from 'util';

// Create Redis client
const client = redis.createClient();

// Promisify the client.get and client.set methods
const getAsync = promisify(client.get).bind(client);

// Event listeners for connect and error events
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

/**
 * Sets a value in Redis for a given key and logs a confirmation message
 * @param {string} shoolName - Key to set in Redis
 * @param {string} value - Value to set in Redis
 */
const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, redis.print);
    
};

/**
 * Logs the value stores in Redis for a given key
 * @param {string} schoolName - Key to get from Redis
 */
const displaySchoolValue = async (schoolName) => {
    try {
        const result = await getAsync(schoolName);
        console.log(result);
        
    } catch (err) {
        console.log(`Error retrieving value for ${schoolName}: ${err.message}`);
    }
};

// Demonstration of the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
