const assert = require('assert');
const User = require('../src/user')

describe('Creating Records', () =>{
    it('Saves a user', () =>{
        const joe = new User({ name: 'joe' })
        joe.save()
            .then(() => {
               assert(!joe.isNew)
               done();
            });
    });
});