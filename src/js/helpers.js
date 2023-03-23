import searchView from "./view/searchView";

const timeOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long, Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const resp = await Promise.race([timeOut(10), fetch(url)]);

    const data = await resp.json();

    if ((data.results && data.results.length === 0) || !resp.ok)
      throw new Error(`We can not  find any result with your query 😢`);

    return data;
  } catch (err) {
    throw err;
  }
};
