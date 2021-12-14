require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'process.env.CLIENT_ID',
  clientSecret: 'process.env.CLIENT_SECRET',
  redirectUri: 'http://localhost:8888/callback'
});

spotifyApi.setAccessToken(process.env.ACCESS_TOKEN);

let numberLimit = 50;

spotifyApi.getMySavedAlbums({
  limit: numberLimit,
  offset: 0
})
  .then(data => {
    for (let i = 0; i < numberLimit; i++) {
      const currentAlbumID = [data.body.items[i].album.id];
      console.log(currentAlbumID);
      spotifyApi.removeFromMySavedAlbums(currentAlbumID)
        .then(data => {console.log(currentAlbumID + ' has been removed.')})
        .catch(err => {console.log('An error has occured when removing album.', err)})
      }
  })
  .catch(err => {console.log('An error has occured when retrieving albums', err)})