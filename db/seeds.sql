INSERT INTO users (first_name, last_name, email, password)
VALUES
  ('James', 'Fraser', 'jf@goldenbough.edu', '12345'),
  ('Jack', 'London', 'jlondon@ualaska.edu', '12345'),
  ('Robert', 'Bruce', 'rbruce@scotland.net', '12345'),
  ('Peter', 'Greenaway', 'pgreenaway@postmodern.com', '12345'),
  ('Derek', 'Jarman', 'djarman@prospectcottage.net', '12345'),
  ('Paolo', 'Pasolini', 'ppasolini@salo.com', '12345'),
  ('Heathcote', 'Williams', 'hwilliams@bafta.com', '12345'),
  ('Sandy', 'Powell', 'spowell@oscars.com', '12345');

  INSERT INTO tags (name)
  VALUES
  ('Fitness'),
  ('Financial'),
  ('Mental Health'),
  ('Health'),
  ('Diet'),
  ('Career');

  INSERT INTO goals (title, description, due_date, is_public, tag_id, user_id)
  VALUES
  ('Get fit', 'Exercize four days a week for a year', '7/27/2022', 1, 1, 1),
  ('Save money', 'save $200 a month for a year', '7/27/2022', 1, 2, 2);

  INSERT INTO milestones (title, description, due_date, is_public, goal_id, user_id)
  VALUES
  ('six month mark', 'working out for six months', '1/27/2022', 1, 1, 1),
  ('saved $1,000', null, '12/27/2021', 1, 2, 2);

  INSERT INTO notes (text, goal_id, milestone_id)
  VALUES
  ('YAY!', null, 2);