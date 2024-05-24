/* global Package */

Package.describe({
  name: 'wekan-accounts-lockout',
  version: '1.0.0',
  summary: 'Meteor package for locking user accounts and stopping brute force attacks',
   // Использует meteor-accounts-lockout из репозитория GitHub, Batyr Ashim 23.05.2024
  git: 'https://github.com/lucasantoniassi/meteor-accounts-lockout.git',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('2.7');
  api.use([
    'ecmascript',
    'accounts-password',
  ]);
  api.mainModule('accounts-lockout.js');
});
