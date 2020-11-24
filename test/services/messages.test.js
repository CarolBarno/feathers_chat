const assert = require('assert');
const app = require('../../src/app');

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages');

    assert.ok(service, 'Registered the service');
  });

  it('creates and processes message, adds user information', async () => {

    //creates a new user
    const user = await app.service('users').create({
      email: 'messagetest@example.com',
      password: 'supersecret'
    });

    //the message service call params
    const params = { user };
    const message = await app.service('messages').create({
      text: 'a test',
      additional: 'should be removed'
    }, params);

    assert.equal(message.text, 'a test');
    //userId should be set to passed users
    assert.equal(message.userId, user._id);
    //additional property has been removed
    assert.ok(!message.additional);
    //user has been populated
    assert.deepEqual(message.user, user);
  });
});
