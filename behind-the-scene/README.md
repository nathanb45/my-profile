# Behind The Scene — Landing V1

Site statique : HTML + CSS + un petit fichier JS. Aucune installation, aucun build.

## Lancer
- Double-cliquer sur `index.html`, ou
- `npx serve .` depuis ce dossier (recommandé pour tester les vidéos).

## Fichiers
- `index.html` — tous les textes, section par section (commentaires `1. HERO`, `2. LE CONCEPT`…).
- `styles.css` — design. Couleurs, typos et espacements dans `:root` en haut du fichier.
- `main.js` — animations légères (apparition au scroll, timecode, lecture des reels).
- `assets/videos/`, `assets/images/` — vos médias.

## Remplacer les placeholders
- **Vidéo du hero** : déposer `assets/videos/hero.mp4` (+ éventuellement `assets/images/hero-poster.jpg`),
  puis décommenter la balise `<video>` dans la section `1. HERO` de `index.html`.
- **Reels (section 5)** : dans chaque `<div class="reel__media"></div>`, ajouter
  `<video src="assets/videos/reel-1.mp4" muted loop playsinline preload="metadata"></video>`
  ou `<img src="assets/images/reel-1.jpg" alt="">`. Format vertical 9:16.
- **E-mail du CTA** : modifier le `href="mailto:..."` dans la section `7. FIN DE PAGE`.
