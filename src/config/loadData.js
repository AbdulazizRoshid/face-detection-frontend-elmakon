import axios from "axios";

export const getAllArreys = async (url) => {
  const token = localStorage.getItem("token");
  let value = [];
  value = await axios
    .get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      // console.log(err?.response?.data?.error);
    });

  return value;
};


