const assert = require('assert')
const User = require('../src/user')

describe('Validation Record', () => {

    it('requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required.')
        
    });

    it('requires a name that has more than two characters', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than two characters.')

    })

    it('disallows invalid records from being saved', () => {
        const user = new User({ name: 'Al' })
        user.save()
            .catch((validationResult) => {
               const { message } = validationResult.errors.name;
               
               assert(message === 'Name must be longer than two characters.')
               done();
            })
    })
});