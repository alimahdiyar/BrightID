import CryptoJS from 'crypto-js';
import store from 'src/store';

export const getExplorerCode = () => {
  const {
    user: { password, id },
  } = store.getState();
  if (!password) {
    return null;
  }
  return CryptoJS.AES.encrypt(id, password).toString();
};
