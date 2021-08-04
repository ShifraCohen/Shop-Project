export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
  
    if (user && token) {
      // for Node.js Express back-end
      return { 'Authorization': token };
    } else {
      return {};
    }
  }