import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Define the sendNotification function
const sendNotification = (phoneNumber, message) => {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process the job
queue.process('push_notification_code', (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message);
    done();
});
