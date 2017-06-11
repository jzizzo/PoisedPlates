const config = require('config')['knex'];
console.log('HOSTNAME: ' + config.util.getEnv('HOSTNAME'));
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

console.log(config);
// console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
