const away = `
SELECT teams.team_name AS name,
  COUNT(matches.id) AS totalGames,
    SUM(
      CASE
        WHEN matches.home_team_goals < matches.away_team_goals THEN 3
        WHEN matches.home_team_goals = matches.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    SUM(
      CASE
        WHEN matches.away_team_id = teams.id
        AND matches.away_team_goals > matches.home_team_goals THEN 1
        ELSE 0
      END
    ) AS totalVictories,
    SUM(
      CASE
        WHEN matches.away_team_id = teams.id
        AND matches.away_team_goals = matches.home_team_goals THEN 1
        ELSE 0
      END
    ) AS totalDraws,
    SUM(
      CASE
        WHEN matches.away_team_id = teams.id
        AND matches.away_team_goals < matches.home_team_goals THEN 1
        ELSE 0
      END
    ) AS totalLosses,
    SUM(matches.away_team_goals) AS goalsFavor,
    SUM(matches.home_team_goals) AS goalsOwn,
    SUM(matches.away_team_goals - matches.home_team_goals) AS goalsBalance,
    FORMAT((SUM(
      CASE
        WHEN matches.away_team_id = teams.id
        AND matches.away_team_goals > matches.home_team_goals THEN 3
        WHEN matches.away_team_id = teams.id
        AND matches.away_team_goals = matches.home_team_goals THEN 1
        ELSE 0
      END
  ) / (COUNT(matches.id) * 3)) * 100, 2) AS efficiency
FROM teams
  INNER JOIN matches ON teams.id = matches.away_team_id
  INNER JOIN teams AS home_teams ON home_teams.id = matches.home_team_id
WHERE
  matches.in_progress = false
GROUP BY teams.id
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC,
  goalsFavor DESC
`;

export default away;
