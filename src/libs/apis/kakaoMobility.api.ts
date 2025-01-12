import axios from 'axios';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

interface QueryTypes {
  origin: string;
  destination: string;
}

const getRouteLine = async ({ origin, destination }: QueryTypes) => {
  try {
    const res = await axios.get(
      `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`,
      {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching route: ${error}`);
  }
};

export default getRouteLine;
