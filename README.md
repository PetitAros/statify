# Statify App

Une application web moderne, fluide et sécurisée permettant d'accéder aux statistiques d'écoute Spotify en temps réel. Découvrez vos morceaux favoris, votre historique récent ainsi que votre musique en cours de lecture à travers une interface optimisée avec les dernières fonctionnalités de Tailwind CSS.

---

## Fonctionnalités

* **Connexion Sécurisée (OAuth2 + PKCE)** : Authentification moderne sans backend (Implicit Flow déprécié évité).
* **En Direct** : Visualisation en temps réel du morceau en cours d'écoute avec un égaliseur graphique animé.
* **Titres les Plus Écoutés** : Classement dynamique (Top 10) filtrable sur 3 périodes distinctes (4 semaines, 6 mois, plusieurs années) avec animations de transition fluides.
* **Historique Récent** : Une timeline temporelle affichant les derniers morceaux joués avec calcul du temps écoulé (*ex: Il y a 5 min*).
* **Design Premium** : Interface basée sur du Glassmorphism, effets de lueur néon et reflets interactifs intégrés en pur Tailwind CSS v4.

---

## Stack Technique

* **Framework** : [React](https://react.dev/) (avec Vite)
* **Styles** : [Tailwind CSS v4](https://tailwindcss.com/)
* **API** : [Spotify Web API](https://developer.spotify.com/)

---

## Installation et Configuration

### 1. Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### 2. Cloner le projet
```bash
git clone [https://github.com/votre-utilisateur/statify-app.git](https://github.com/votre-utilisateur/statify-app.git)
cd statify-app
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Configuration du Dashboard Spotify Developer
1. Rendez-vous sur le [Spotify Developer Dashboard](https://developer.spotify.com/).
2. Créez une nouvelle application.
3. Dans les **Settings**, ajoutez l'URI de redirection exacte : `127.0.0.1:5173/` et sauvegardez. (localhost peut ne pas fonctionner sur certainnes distributions/configurations)

### 5. Variables d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez votre Client ID :
```env
VITE_SPOTIFY_CLIENT_ID=votre_client_id_spotify_ici
```

---

## Lancement

Pour démarrer le serveur de développement local :

```bash
npm run dev
```

Ouvrez ensuite votre navigateur sur `127.0.0.1:5173/`.

---

## Architecture des Dossiers

Le projet suit une structure modulaire par fonctionnalités (features) pour une meilleure scalabilité :

```text
src/
├── features/
│   ├── livePlayback/       # Logique et composants de la lecture en cours
│   ├── recentlyPlayed/     # Logique de la timeline de l'historique
│   └── topTracks/          # Gestion du Top 10 et du switch de périodes
├── shared/
│   └── components/         # Composants globaux (Navbar, Hero, FeatureCard)
├── index.css               # Configuration @theme, @layer et @utility de Tailwind v4
├── service/
│   ├── spotifyApi.js       # Endpoints et appels fetch vers l'API Spotify
    └── spotifyAuth.js      # Logique de cryptographie PKCE & échange de tokens

```

---

## Personnalisation Graphique

L'application utilise les fonctionnalités avancées de **Tailwind CSS v4**. Vous pouvez modifier l'identité visuelle de l'application (passer du vert Spotify au violet Cyber, changer les animations ou les ombres) directement dans le fichier `src/index.css` sous la directive `@theme`.

---

*Note : Une vidéo montrant les principales feature se trouvent dans le dossier `/src/assets/demo.mp4`*

Une démo se trouve à l'adresse `https://statify-theta.vercel.app/` que si l'adresse mail de l'utilisateur a été enregistré dans le compte spotify Developper.