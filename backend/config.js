//temp not used atm
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: 3000
 },
 db: {
   host: 'mongodb://localhost:27017/test_lobsters_questions',
   name: 'db'
 }
};

const test = {
 app: {
   port: 3000
 },
 db: {
   host: 'mongodb+srv://readwrite:[password]@cluster0-5u44s.mongodb.net/test?retryWrites=true',
   name: 'test'
 }
};

const config = {
 dev,
 test
};

module.exports = config[env];