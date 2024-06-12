import kue from 'kue';

// Blacklisted phone numbers
const blacklisted = ['4153518780', '4153518781'];

// Create a queue
const queue = kue.createQueue();

/**
 * sendNotification function
 * @param {String} phoneNumber - The phone number to send notification to
 * @param {String} message - The message to send
 * @param {object} job - The job object
 * @param {function} done - The callback function
 */
const sendNotification = (phoneNumber, message, job, done) => {
    // Track the job progress
    job.progress(0, 100);

    if (blacklisted.includes(phoneNumber)) {
        const error = new Error(`Phone number ${phoneNumber} is blacklisted`)
        done(error);
        return
    }

    // Update progress to 50%
    job.progress(50, 100);

    // Simulate sending notification
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    
    // Mark the job as completed
    done();
};

// Process the job
queue.process('push_notification_code_2', 2, (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
});


// Error handling for the entire queue process
queue.on('error', (err) => {
    console.error('Queue Error:', err);
  });