const sandbox = require('sandboxjs'),
    app = require('./app'),
    constants = require('./helpers/consts'),
    assert = require('assert'),
    util= require('util');

const profile = sandbox.fromToken(constants.WT_TOKEN);
const code = util.format("module.exports = %s", app);
// profile.create(code,  { secrets: { auth0: 'rocks' } }, function (err, webtask) {
//     assert.ifError(err);
//     console.log(webtask.url)
// });
profile.run(code, function(err,res,body){
   assert.ifError(err);
});