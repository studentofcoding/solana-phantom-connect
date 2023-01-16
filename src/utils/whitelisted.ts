// const admin = require('./admin.json');

export const whitelisted = require('./wl.json');

export function isWhitelisted(address) {
  return whitelisted.includes(address);
}

// export function isAdmin(address) {
//   return admin.includes(address);
// }