import kue from 'kue';

// Create a queue instance
const queue = kue.createQueue();

// Create a job data
const jobData = {
    phoneNumber: '0844437287',
    message: 'Test test',
};

// Another queue to create a job
const job = queue.create('push_notification_code', jobData)
    .save((err) => {
        if (!err) {
            console.log(`Notification job created: ${job.id}`);
        }
    });

// Listen to the queue error event
job.on('complete', () => {
    console.log('Notification job completed');
}).on('failed', () => {
    console.log('Notification job failed');
});
