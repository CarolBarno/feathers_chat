// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { add } = require("winston");

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    //get app, method, params, result from hook context
    const { app, method, result, params } = context;

    //function that adds user to a single message
    const addUser = async message => {
      //get user based on their id
      const user = await app.service('users').get(message.userId, params);

      //merge the message content to include the user

      return {
        ...message,
        user
      };
    };

    if (method === 'find') {
      //map all the data to include user info
      context.result.data = await Promise.all(result.data.map(addUser));
    } else {
      //just update the single result
      context.result = await addUser(result);
    }

    return context;
  };
};
