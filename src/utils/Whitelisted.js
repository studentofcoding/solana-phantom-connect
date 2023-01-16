// const admin = require('./admin.json');

import whitelisted from './wl.json';

export default function isWhitelisted(address) {
  return whitelisted.includes(address);
}

// export function isAdmin(address) {
//   return admin.includes(address);
// }