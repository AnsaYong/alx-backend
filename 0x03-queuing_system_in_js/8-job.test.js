import { expect } from 'chai';
import kue from 'kue';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
    let queue;

    before(() => {
        queue = kue.createQueue();
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.clear();
    });

    after(() => {
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
    });

    it('should create jobs in the queue when jobs is an array', () => {
        const jobs = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            },
            {
                phoneNumber: '4153518781',
                message: 'This is the code 4562 to verify your account'
            }
        ];

        createPushNotificationsJobs(jobs, queue);

        expect(queue.testMode.jobs.length).to.equal(2);
        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[0].data).to.eql(jobs[0]);
        expect(queue.testMode.jobs[1].data).to.eql(jobs[1]);
    });

    it('should log the appropriate messages for job events', () => {
        const jobs = [
            {
                phoneNumber: '4153518780',
                message: 'This is the code 1234 to verify your account'
            }
        ];

        // Capture console.log output
        const consoleSpy = sinon.spy(console, 'log');

        createPushNotificationsJobs(jobs, queue);

        const job = queue.testMode.jobs[0];
        job.emit('complete');
        job.emit('failed', new Error('Some error'));
        job.emit('progress', 50);

        expect(consoleSpy.calledWith(`Notification job created: ${job.id}`)).to.be.true;
        expect(consoleSpy.calledWith(`Notification job #${job.id} completed`)).to.be.true;
        expect(consoleSpy.calledWith(`Notification job #${job.id} failed: Some error`)).to.be.true;
        expect(consoleSpy.calledWith(`Notification job #${job.id} 50% complete`)).to.be.true;

        consoleSpy.restore();
    });
});
