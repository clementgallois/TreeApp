function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve, reject,
      options,
    );
  });
}

async function getLocation() {
  try {
    const res = await getCurrentLocation({
      enableHighAccuracy: false,
      timeout: 5000,
    });
    return { longitude: res.coords.longitude, latitude: res.coords.latitude };
  } catch (err) {
    return { error: err.message };
  }
}

export default getLocation;
