//setup shims
export const Promise = global.Promise || require('es6-promise').Promise
export const promisify = require('es6-denodeify')(Promise)
