import { Axios } from './Axios';

export const getHistory = async (
  token: string,
  memberId: number,
  isSeller: boolean,
) => {
  const response = await Axios.get(
    `/api/members/${memberId}/histories?isSeller=${isSeller}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
