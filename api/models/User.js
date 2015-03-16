var User = {
  // Enforce model schema in the case of schemaless databases
  autosubscribe: ['destroy', 'update'],
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true, required: true},
    passports : { collection: 'Passport', via: 'user' },

    channels: {
      collection: 'channel',
      via: 'users',
      dominant: true
    }
  },
  validationMessages: { //hand for i18n & l10n
    email: {
      required: 'Email is required',
      email: 'Provide valid email address',
      unique: 'Email address is already taken'
    },
    name: {
      required: 'Username is required'
    },
    password: {
      password: 'The password doesn\'t match'
    }
  }


};

module.exports = User;
