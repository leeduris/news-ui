import customAxios from '../../../config/customAxios';

export const submitCreateAccount = async (account) => {
  try {
    return await customAxios({
      method: 'post',
      url: '/api/users/auth/signup',
      data: account,
    });
  } catch (err) {
    throw new Error();
  }
};

export const submitLogIn = async (user) => {
  try {
    return await customAxios({
      method: 'post',
      url: '/api/users/auth/login',
      data: user,
    });
  } catch (err) {
    throw new Error();
  }
};

export const checkEmailExist = async (email) => {
  try {
    return await customAxios({
      method: 'post',
      url: '/api/users/auth/signup/checkemail',
      data: { email },
    });
  } catch (err) {
    throw new Error();
  }
};

export const submitLogOut = async () => {
  try {
    return await customAxios({
      method: 'get',
      url: '/api/users/auth/logout',
    });
  } catch (err) {
    throw new Error();
  }
};

export const getUser = async (userId) => {
  try {
    return await customAxios({
      method: 'get',
      url: `/api/users/${userId}`,
    });
  } catch (err) {
    throw new Error();
  }
};
