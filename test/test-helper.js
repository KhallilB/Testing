const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(() => {
    mongoose.connect('mongodb://localhost/users_test')
    mongoose.connection
        .once('open', () => console.log('Good To Go!'))
        .on('error', (error) => {
            console.warn('Warning', error); 
        });
});

    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            done()
        })
    })