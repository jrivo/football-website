# Football-Website

Ce répertoire contient le site utilisant l'API à l'addresse https://api.foot.kreyzix.com (repo https://github.com/jrivo/football-api). C'est un site en React Static.

Le site contient 3 URI principales :

- /nextMatch/:teamId (ex: https://foot.kreyzix.com/nextMatch/100)

Cette méthode permet d'afficher le prochain match d'une équipe à partir de son teamId (défini par l'API externe que nous utilisons). Elle affiche le prochain match de l'équipe s'il n'a pas commencé, dans le cas contraire, elle affiche le match en cours de l'équipe, en appelant le prochain chemin que je vais présenter.

- currentMatch/:matchId

Cette méthode permet d'afficher les informations sur un match en cours à partir de son ID. Elle retourne un certain nombre d'informations comme le score, la minute de jeu, l'heure de début...

- lastMatches/:teamId (ex: https://foot.kreyzix.com/lastMatches/3815)

Cette méthode permet d'afficher les informations des 5 derniers matchs d'une équipe.

- getFinishedMatch

Cette méthode permet d'afficher les informations d'un match terminé, notamment pour connaître le gagnant d'un match. Elle est notamment utilisée dans WorkAdventure pour la partie résultats de paris.


