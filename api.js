const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const apiKey = "cc6t5Z4zQ0n71I58uxkVdw==ng1kVMPnDunQar5H";
const apiUrl =
  "https://api.api-ninjas.com/v1/nutrition?query=0.5lb vegetable soup";
const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};
const getData = async () => {
  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
module.exports = getData();
