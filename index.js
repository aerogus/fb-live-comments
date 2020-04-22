#!/usr/bin/env node

/**
 * Récupération des commentaires d'un FB Live
 *
 * Todo créer une app FB sur https://developers.facebook.com/
 * et récupérer l'identifiant d'app + la clé secrète dans "Paramètres" / "Général"
 * L'app doit être "en ligne" (pas "en développement")
 */

const EventSource = require('eventsource');
const request = require('request');
const fs = require('fs');

const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);

if (config.FB_USER_ACCESS_TOKEN) {
  console.log('via user access token');
  startReading(config.FB_VIDEO_ID, config.FB_USER_ACCESS_TOKEN);
} else {
  console.log('via app access token');
  // url pour récupérer l'app access token
  const FB_APP_ACCESS_TOKEN_URL= 'https://graph.facebook.com/oauth/access_token?client_id='+config.FB_APP_ID+'&client_secret='+config.FB_APP_SECRET+'&grant_type=client_credentials';
  console.log(FB_APP_ACCESS_TOKEN_URL);
  request.get({url: FB_APP_ACCESS_TOKEN_URL, json: true}, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      startReading(config.FB_VIDEO_ID, data.access_token);
    }
  });
}

function startReading(videoId, accessToken) {
  // Graph API URL
  const FB_LIVE_COMMENTS_URL = "https://streaming-graph.facebook.com/"+videoId+"/live_comments?access_token="+accessToken+"&comment_rate=ten_per_second&fields=from{name,id},message";
  var es = new EventSource(FB_LIVE_COMMENTS_URL);
  es.onerror = (err) => {
    console.log(err);
  };
  es.onmessage = (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
	// récupérer l'avatar localement
    // @see https://developers.facebook.com/docs/graph-api/reference/user/picture/?locale=fr_FR
    // GET https://graph.facebook.com/v6.0/$user_id$/picture (après redirections, stocker le jpg et le nommer)
  };
}

