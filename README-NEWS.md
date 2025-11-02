# 📰 Guide pour ajouter une actualité

Ce guide vous explique comment ajouter une nouvelle actualité sur le site de la Mosquée Ar-Rahmane.

## 📍 Où se trouve le fichier des actualités ?

Le fichier contenant toutes les actualités se trouve ici :
```
src/data/news.json
```

## ✏️ Comment ajouter une actualité ?

### Étape 1 : Ouvrir le fichier
Ouvrez le fichier `src/data/news.json` avec un éditeur de texte.

### Étape 2 : Copier le modèle
Copiez le modèle ci-dessous et ajoutez-le au début du tableau (juste après le premier `[`) :

```json
{
  "id": 4,
  "title": "Titre de votre actualité",
  "date": "2025-01-15",
  "category": "Annonce",
  "excerpt": "Résumé court de l'actualité (2-3 lignes maximum)",
  "content": "Contenu complet de l'actualité. Vous pouvez écrire plusieurs paragraphes ici pour décrire l'événement ou l'annonce en détail.",
  "imageUrl": ""
},
```

⚠️ **N'oubliez pas la virgule** à la fin si ce n'est pas la dernière actualité !

### Étape 3 : Remplir les champs

| Champ | Description | Exemple |
|-------|-------------|---------|
| **id** | Numéro unique (utilisez le numéro suivant disponible) | `4`, `5`, `6`... |
| **title** | Titre de l'actualité | `"Célébration de l'Aïd"` |
| **date** | Date au format AAAA-MM-JJ | `"2025-01-15"` |
| **category** | Catégorie (voir liste ci-dessous) | `"Annonce"` |
| **excerpt** | Résumé court (2-3 lignes) | `"Rejoignez-nous pour..."` |
| **content** | Texte complet de l'actualité | Texte détaillé |
| **imageUrl** | Lien vers une image (optionnel) | `""` ou `"https://..."` |

### Catégories disponibles
- `"Annonce"` - Pour les annonces générales
- `"Éducation"` - Pour les cours et formations
- `"Projet"` - Pour les projets de la mosquée
- `"Événement"` - Pour les événements spéciaux
- `"Communauté"` - Pour les nouvelles de la communauté

## 📝 Exemple complet

Voici un exemple d'actualité complète :

```json
{
  "id": 4,
  "title": "Célébration de l'Aïd al-Fitr 1446",
  "date": "2025-03-30",
  "category": "Événement",
  "excerpt": "Venez célébrer l'Aïd al-Fitr avec toute la communauté. Prière à 8h30 suivie d'un petit-déjeuner fraternel.",
  "content": "La Mosquée Ar-Rahmane vous invite à célébrer l'Aïd al-Fitr le dimanche 30 mars 2025. La prière de l'Aïd débutera à 8h30, suivie d'un petit-déjeuner fraternel pour tous les participants. Venez nombreux partager ce moment de joie avec votre famille et vos frères et sœurs en Islam.",
  "imageUrl": ""
}
```

## 🖼️ Comment ajouter une image ?

### Option 1 : Image en ligne
Si vous avez une image hébergée sur Internet :
```json
"imageUrl": "https://exemple.com/mon-image.jpg"
```

### Option 2 : Image locale
1. Placez votre image dans le dossier `src/assets/`
2. Référencez-la comme ceci :
```json
"imageUrl": "/src/assets/mon-image.jpg"
```

## ⚠️ Points importants

1. **Format JSON** : Respectez bien le format JSON (guillemets, virgules, accolades)
2. **ID unique** : Chaque actualité doit avoir un ID différent
3. **Date** : Format obligatoire `AAAA-MM-JJ`
4. **Virgules** : N'oubliez pas la virgule entre chaque actualité
5. **Guillemets** : Utilisez toujours des guillemets doubles `"` pas simples `'`

## 🔄 Structure du fichier complet

```json
[
  {
    "id": 4,
    "title": "Nouvelle actualité",
    ...
  },
  {
    "id": 3,
    "title": "Actualité précédente",
    ...
  },
  {
    "id": 2,
    "title": "Encore une actualité",
    ...
  }
]
```

## ✅ Vérification

Après avoir ajouté votre actualité :
1. Vérifiez qu'il n'y a pas d'erreur de syntaxe
2. Sauvegardez le fichier
3. Rafraîchissez le site
4. Vérifiez que l'actualité apparaît sur la page `/actualites`

## 🆘 Besoin d'aide ?

Si vous rencontrez des difficultés :
- Vérifiez que vous avez bien respecté le format JSON
- Utilisez un validateur JSON en ligne : https://jsonlint.com/
- Contactez l'administrateur du site

---

**Dernière mise à jour** : Janvier 2025