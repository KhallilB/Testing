const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments can be created', () => {

    it('can creat sub documents' , () => {
        const joe = new User({ name: 'Joe', 
        post: [{ title: 'Post Title' }] 
     });
    
     joe.save()
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            assert(user.post[0].title === 'Post Title');
            done()
        })
    });

    it('Can add subdocument to exsisting record', () => {
        const joe = new User({ 
            name: 'Joe',
            post: []
        })

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'Post Title' })
                user.save();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.post[0].title === 'New Post')
                done()
            })
    })
});