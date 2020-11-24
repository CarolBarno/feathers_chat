// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;

    if (!data.text) {
      throw new Error('a message must have a text');
    }

    //the logged in user
    const { user } = context.params;

    //the actual message text
    const text = data.text.substring(0, 400);

    //update original data
    context.data = {
      text,
      //set the user id
      userId: user._id,
      //add the current data
      createdAt: new Date().getTime()
    };

    return context;
  };
};
