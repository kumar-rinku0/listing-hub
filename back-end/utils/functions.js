if (process.env.NODE_ENV != "development") {
  require("dotenv").config();
}

const mapToken = process.env.MAPBOX_DEFAULT_TOKEN;

// Function to reverse geocode (coordinates to address)
const reverseGeocode = async (latitude, longitude) => {
  const res = await fetch(
    `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${mapToken}`
  );
  const data = await res.json();
  return data.features[0].properties.full_address || null;
};

const forwardGeocode = async (address) => {
  const res = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
      address
    )}&access_token=${mapToken}`
  );
  const data = await res.json();
  return data.features[0].geometry || null;
};

module.exports = { reverseGeocode, forwardGeocode };
