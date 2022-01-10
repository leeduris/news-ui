import customAxios from '../../../config/customAxios';

export const pullNewsApi = async () => {
  try {
    return await customAxios({
      method: 'post',
      url: '/api/articles',
    });
  } catch (err) {
    throw new Error();
  }
};

export const getAllNewsApi = async () => {
  try {
    return await customAxios({
      method: 'get',
      url: '/api/articles',
    });
  } catch (err) {
    throw new Error();
  }
};
