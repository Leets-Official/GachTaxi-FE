import axios from 'axios';

const getPresignedUrl = async (url: string, data: File) => {
  await axios.put(`${url}`, data);
};

export default getPresignedUrl;
