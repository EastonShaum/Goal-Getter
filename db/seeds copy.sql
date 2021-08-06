INSERT INTO teams (name, motto)
VALUES
  ('Fitness Gurus', 'Healthy body healthy life'),
  ('Finance Masters', 'Work, save, invest'),
  ('Self-care Professionals', 'Mindfulness will bring happiness');

INSERT INTO users (username, first_name, last_name, email, password, team_id)
VALUES
  ('jamie_fraser', 'James', 'Fraser', 'jf@goldenbough.edu', '12345', 1),
  ('jack_london', 'Jack', 'London', 'jlondon@ualaska.edu', '12345', 2),
  ('robert_bruce', 'Robert', 'Bruce', 'rbruce@scotland.net', '12345', 3),
  ('peter_greenaway', 'Peter', 'Greenaway', 'pgreenaway@postmodern.com', '12345', null),
  ('derek_jarman', 'Derek', 'Jarman', 'djarman@prospectcottage.net', '12345', null),
  ('paolo_pasolini', 'Paolo', 'Pasolini', 'ppasolini@salo.com', '12345', null),
  ('heathcote_williams', 'Heathcote', 'Williams', 'hwilliams@bafta.com', '12345', null),
  ('sandy_powell', 'Sandy', 'Powell', 'spowell@oscars.com', '12345', null);

  INSERT INTO tags (name)
  VALUES
  ('Fitness'),
  ('Financial'),
  ('Mental Health'),
  ('Health'),
  ('Diet'),
  ('Career');

  INSERT INTO goals (title, description, due_date, is_public, tag_id, user_id, team_id)
  VALUES
  ('Get fit', 'Exercize four days a week for a year', '7/27/2021', 1, 1, 1, 1),
  ('Save money', 'save $200 a month for a year', '7/27/2022', 1, 2, 2, 2);

  INSERT INTO milestones (title, description, due_date, is_public, goal_id, user_id)
  VALUES
  ('six month mark', 'working out for six months', '1/27/2022', 1, 1, 1),
  ('saved $1,000', null, '12/27/2021', 1, 2, 2);

  INSERT INTO notes (text, goal_id, milestone_id)
  VALUES
  ('YAY!', null, 2);