const assert = require('assert')
const User = require('../src/user')

describe('Reading Users out of the database', () => {
    let joe;

    beforeEach(() => {
        joe = new User({ name: 'Joe' })
        joe.save()
        .then((done) => { done() })
        .catch((error) => {
            console.log('Error', error)
        })

    })

    it('finds all users with name Joe', () => {
        let joe;

        User.find({ name: 'Joe' })
        .then((users) => {
            console.log(users)
            assert(users[0]._id.toString() === joe._id.toString())
            done()
        }) 
    });

    it('finds a user with a particulat id', () => {
        User.findOne({ _id: joe.id })
            .then((user) => {
                assert(user.name === 'Joe')
                done();
            })
    });
});