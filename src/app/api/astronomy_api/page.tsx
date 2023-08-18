
function getMoonData() {
  const applicationId = process.env.APPLICATION_ID;
  const applicationSecret = process.env.APPLICATION_SECRET;

  const authString = btoa(`${applicationId}:${applicationSecret}`);

  const URL = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';
}

// use SWR library to fetch