import jwt from 'jsonwebtoken';

export default class Utils {
  static capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static lowercase(s) {
    if (typeof s !== 'string') return '';
    return s.toLowerCase();
  }

  static tokenGenerate() {
    return jwt.sign({ user: 'admin' }, process.env.REACT_APP_SERVER_API_KEY);
  }
}
