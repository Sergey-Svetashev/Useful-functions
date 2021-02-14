const validator = {

  //All available validation types
  types: {
    /*Checks that a Value is not the empty*/
    isNonEmpty: {
      validate: function (value) {
        return value !== '';
      },
      instructions: 'The value is not be empty'
    },

    /*Checks if a value is number*/
    isNumber: {
      validate: function (value) {
        return !isNaN(value);
      },
      instructions: 'The value can only be a valid number, e.g. 1, 3, 17 or 2010'
    },

    /*CHecks if a value contains only letters or numbers*/
    isAlphaNum: {
      validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
      },
      instructions: 'The value can contains only numbers or letters, no special symbols'
    }
  },

  //Error messages in current validation stage
  massages: [],

  //Current validation settings
  options: {},
  config: function (options) {

    for (let opt in options) {
      if (options.hasOwnProperty(opt)) {
        this.options[opt] = options[opt]
      }
    }

    return this

  },

  //Data argument is a pare: key, value
  validate: function (data) {

    let i,
      msg,
      type,
      checker,
      result_ok;

    //Delete all messages
    this.messages = [];


    for(i in data) {

      if (data.hasOwnProperty(i)) {
        type = this.options[i];
        checker = this.types[type];

        if (!type) {
          console.log('Validation is not required', type);
        }

        if (!checker) {
          throw {
            name: 'ValidationError',
            message: 'No hadler to validate type: '+ type
          };
        }

        result_ok = checker.validate(data[i]);
        console.log(result_ok)

        if (!result_ok) {
          msg = 'Invalid value for *' + i + '*, ' + checker.instructions;
          console.log(checker.instructions, 'Error in ' + i)
          this.messages.push(msg);
        }
      }

    }

    return this.hasErrors();

  },

  hasErrors: function () {
    return this.messages.length !== 0;
  }
}

let data = {
  name: 'Super',
  // last_name: 'Man',
  age: 'hghgfh',
  username: '0_0'
}

validator.config({
  name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
}).validate(data)