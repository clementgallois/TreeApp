import config from '../../config';

async function getTree(longitude, latitude) {
  const request = new Request(`http://${config.api.address}:${config.api.address}/tree`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      longitude,
      latitude,
    }),
  });
  return fetch(request).then(response => response.json()).catch(error => error);
}

export default getTree;
