const assert = require('assert')
const User = require('../src/user')

describe('Delete User', () => {
    let joe;

    beforeEach(() => {
        joe = new User ({ name: 'Joe' })
        joe.save()
            .then((done) => { done() })
            .catch((error) => {
                console.log('Error', error)
            })
    })

    it('model instance remove', () => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => { 
                assert(user === null);
                done();
            })
    })

    it('class method remove', () => {
        joe = new User ({ name: 'Joe' })
        User.remove({ name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })

    it('class method find and remove', () => {
        User.findOneAndRemove({ name: 'Joe' })
        .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })

    it('clas method find by id and remove', () => {
        User.findByIdAndRemove(joe._id)
        .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })
});