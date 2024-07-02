const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const FinanceUser = require('../models/FinanceUser');

class UserFactory {
    static createUser(type, userDetails) {
        switch (type) {
            case 'Doctor':
                return new Doctor(userDetails);
            case 'Patient':
                return new Patient(userDetails);
            case 'FinanceUser':
                return new FinanceUser(userDetails);
            default:
                throw new Error(`Invalid user type: ${type}`);
        }
    }
}

module.exports = UserFactory;
