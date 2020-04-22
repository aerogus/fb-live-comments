# Récupérer les commentaires d'un FB Live

## Création d'une appli Facebook

* Créer une app FB sur `https://developers.facebook.com/`
* Récupérer l'identifiant d'app + la clé secrète dans "Paramètres" / "Général"
* L'app doit être "en ligne" (pas "en développement")

## Recherche d'une vidéo

* Allez sur `https://www.facebook.com/watch/live/` pour trouver une vidéo live sympa
* Récupérez son url, elle doit être de la forme : `https://www.facebook.com/page_id/videos/video_id`
* Extrayez son identifiant de vidéo, c'est une longue chaine numérique

## Installation

C'est une app `node.js` toute simple, il vous faut donc `node.js` installé ainsi que `npm` ou `yarn`.

```
npm install
cat config.json.dist | grep -v "//" > config.json
```

saisissez les paramètres obligatoires suivants:

* `FB_APP_ID`
* `FB_APP_SECRET`
* `FB_VIDEO_ID`

Le paramètre optionnel `FB_USER_ACCESS_TOKEN` peut être obtenu à cette adresse :

Puis lancez le tout :

```
npm start
```

Les commentaires apparaissent sous forme d'objets `json`

## Ressources

* <https://developers.facebook.com/docs/graph-api/reference/user/picture/?locale=fr_FR>
* <https://developers.facebook.com/docs/graph-api/server-sent-events/endpoints/live-comments/?locale=fr_FR>

