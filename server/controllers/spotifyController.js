/* eslint-disable import/no-extraneous-dependencies */
const querystring = require('node:querystring');
// eslint-disable-next-line import/no-extraneous-dependencies
const randomstring = require('randomstring');
const { Buffer } = require('node:buffer')
const fetch = require('node-fetch');

const clientId = process.env.CLIENT_ID;
const redirectUrl = 'http://localhost:3000/spotify';
const spotifyScope = 'user-read-private user-read-recently-played';
const serverState = randomstring.generate(16);


const spotifyController = {};

spotifyController.getApprove = (req, res) => {
  // eslint-disable-next-line prefer-template
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: spotifyScope,
      redirect_uri: redirectUrl,
      state: serverState
    }));
}

spotifyController.checkApprove = (req, res, next) => {
  try {
    const {code, state} = req.query
    if (!code) {
      throw new Error(req.query.error);
    }
    if (state !== serverState){
      throw new Error('returned state does not equal to serverState')
    }
    res.locals.authCode = code;
    return next();
  } catch (err) {
    res.redirect('/accessDenied') 
    // return next({
    //   log: `error in spotifyController.checkApprove: ${err}`,
    //   message: `error in spotifyController.checkApprove: ${err}`
    // })
    
  }
}

spotifyController.getToken = async (req, res, next) => {
  try {
    const params = new URLSearchParams();
    params.append('code', res.locals.authCode);
    params.append('redirect_uri', redirectUrl);
    params.append('grant_type', 'authorization_code');
    const buffer = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {method: 'POST', body: params, headers: {
        'Authorization': `Basic  ${buffer}`
      },});
    const data = await response.json();
    console.log('here it is', data)
  
  } catch (err) {
    console.log(err)
  }
}

module.exports = spotifyController;
