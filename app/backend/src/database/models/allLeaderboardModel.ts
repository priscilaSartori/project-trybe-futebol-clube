const all = `
SELECT teams.team_name AS name,
COUNT(matches.id) AS totalGames,
  SUM(
    CASE
      WHEN matches.home_team_id = teams.id
      AND matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.away_team_id = teams.id
      AND matches.away_team_goals > matches.home_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  SUM(
    CASE 
      WHEN matches.home_team_id = teams.id 
      AND matches.home_team_goals > matches.away_team_goals THEN 1
      WHEN matches.away_team_id = teams.id 
      AND matches.away_team_goals > matches.home_team_goals THEN 1
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
      WHEN matches.home_team_id = teams.id 
      AND matches.home_team_goals < matches.away_team_goals THEN 1
      WHEN matches.away_team_id = teams.id 
      AND matches.away_team_goals < matches.home_team_goals THEN 1
      ELSE 0 
    END
  ) AS totalLosses,
  SUM(
    CASE 
      WHEN matches.home_team_id = teams.id THEN matches.home_team_goals
      WHEN matches.away_team_id = teams.id THEN matches.away_team_goals
      ELSE 0 
    END
  ) AS goalsFavor,
  SUM(
    CASE 
      WHEN matches.home_team_id = teams.id THEN matches.away_team_goals
      WHEN matches.away_team_id = teams.id THEN matches.home_team_goals
      ELSE 0 
    END
  ) AS goalsOwn,
  SUM(
    CASE 
      WHEN matches.home_team_id = teams.id THEN matches.home_team_goals - matches.away_team_goals
      WHEN matches.away_team_id = teams.id THEN matches.away_team_goals - matches.home_team_goals
      ELSE 0 
    END
  ) AS goalsBalance,
 round((SUM(
    CASE
      WHEN matches.home_team_id = teams.id 
      AND matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.away_team_id = teams.id 
      AND matches.away_team_goals > matches.home_team_goals THEN 3
      WHEN matches.home_team_id = teams.id 
      AND matches.home_team_goals = matches.away_team_goals THEN 1
      WHEN matches.away_team_id = teams.id 
      AND matches.home_team_goals = matches.away_team_goals THEN 1
      ELSE 0
    END
  ) / (COUNT(
    CASE
      WHEN matches.home_team_id = teams.id OR matches.away_team_id = teams.id THEN 1
    END
  ) * 3) * 100),2) AS efficiency
FROM matches
INNER JOIN teams ON teams.id = matches.home_team_id OR teams.id = matches.away_team_id
WHERE matches.in_progress = false
GROUP BY teams.id
ORDER BY 
  totalPoints DESC, 
  totalVictories DESC,
  goalsBalance DESC, 
  goalsFavor DESC`;

export default all;
