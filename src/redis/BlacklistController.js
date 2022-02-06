const blacklist = require('./blacklist');

const { promisify } = require('util');
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function createHashToke(token) {
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    insert : async token => {
        const expirationDate = jwt.decode(token).exp;
        const hashToken = createHashToke(token);
        
        await setAsync(hashToken, '');
        blacklist.expireat(hashToken, expirationDate);
    },

    hasToken : async token => {
        const tokenHash = createHashToke(token);
        const resultado = await existsAsync(tokenHash);
        return resultado === 1;
    }   
}