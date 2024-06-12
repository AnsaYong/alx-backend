import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

/**
 * sendNotification function
 * @param {String} phoneNumber - The phone number to send notification to
 * @param {String} message - The message to send
 */
const sendNotification = (phoneNumber, message) => {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process the job
queue.process('push_notification_code', (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message);
    done();
});
