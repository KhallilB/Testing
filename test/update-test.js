const assert = require('assert')
const User = require('../src/user')

describe('Updating Records', () => {
    let joe;

    beforeEach(() => {
        joe = new User({ name: 'Joe' }, { postCount: 10 })
        joe.save()
            .then((done) => { done() })
            .catch((error) => {
                console.log('Error', error)
            })
    })

    function assertName(operation) {
        operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1)
            assert(users[0].name === 'Alex')
            done()
        })
    }

    it('instance set and save', () => {
        console.log(joe)
        joe.set('name', 'Alex')
        console.log(joe)
        assertName(joe.save());
            
    });

    it('a model instance can update', () => {
        assertName(joe.update({ name: 'Alex' }))
    });

    it('model class can update', () => {
        assertName(
            User.update({ name: 'Joe' }, { name: 'Alex' })
            );
    })

    it('model claas can update one record', () => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex' })
        );
    })

    it('model class can find by id and update', () => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex' })
        )
    })

    it('a user can have their post count incremented by one', () => {
        User.update({ name: 'Joe'}, { $inc: { postCount: 1 } })
            .then(User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.postCount === 11);
            })
    })
})