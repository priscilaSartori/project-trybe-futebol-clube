const home = `
SELECT teams.team_name,
SUM(
  CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  SUM(
    CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalVictories,
  SUM(
    CASE
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalDraws,
  SUM(
    CASE
      WHEN matches.home_team_goals < matches.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalLosses,
  SUM(matches.home_team_goals) AS goalsFavor,
  SUM(matches.away_team_goals) AS goalsOwn,
FROM teams
INNER JOIN matches ON teams.id = matches.home_team_id
INNER JOIN teams AS away_teams ON away_teams.id = matches.away_team_id
WHERE matches.in_progress = false
COUNT(matches.id) AS totalGames,
GROUP BY teams.id
ORDER BY
    totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC
`;

export default home;
