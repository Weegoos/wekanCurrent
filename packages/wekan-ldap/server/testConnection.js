import LDAP from './ldap';

Meteor.methods({
  ldap_test_connection() {
    const user = Meteor.user();
    if (!user) {
      throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'ldap_test_connection' });
    }

    //TODO: This needs to be fixed - security issue -> alanning:meteor-roles
    //if (!RocketChat.authz.hasRole(user._id, 'admin')) {
    //	throw new Meteor.Error('error-not-authorized', 'Not authorized', { method: 'ldap_test_connection' });
    //}

    if (LDAP.settings_get(LDAP_ENABLE) !== true) {
      throw new Meteor.Error('LDAP_disabled');
    }

    let ldap;
    try {
      ldap = new LDAP();
      ldap.connectSync();
    } catch (error) {
      if (!PRODUCTION) {
        console.error(error); // Ertargyn 17:04 изменили и добавили else
      } else {
        console.error('An error occurred while connecting to LDAP.');
      }
      throw new Meteor.Error('LDAP connection error');
    }

    try {
      ldap.bindIfNecessary();
    } catch (error) {
      if (!PRODUCTION) {
        console.error(error);
      } else {
        console.error('An error occurred while binding to LDAP.');
      }
      throw new Meteor.Error('LDAP bind error');
    }

    return {
      message: 'Connection_success',
      params: [],
    };
  },
});
