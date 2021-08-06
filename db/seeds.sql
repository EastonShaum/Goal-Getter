-- INSERT INTO teams (name, motto)
-- VALUES
--   ('Fitness Gurus', 'Healthy body healthy life'),
--   ('Finance Masters', 'Work, save, invest'),
--   ('Self-care Professionals', 'Mindfulness will bring happiness');

INSERT INTO users (username, first_name, last_name, email, password)
VALUES
  ('Jped', 'Jake', 'Pedigo', 'jake@gmail.com', 'Jake1!'),
  ('Jvesterfelt', 'Jamie', 'Vesterfelt', 'Jamie@gmail.com', 'Jamie1!'),
  ('Bangus', 'BoDee', 'Angus', 'bodee@gmail.com', 'Bodee1!'),
  ('Eshaum', 'Easton', 'Shaum', 'easton@gmail.com', 'Easton1!');

  -- INSERT INTO tags (name)
  -- VALUES
  -- ('Fitness'),
  -- ('Financial'),
  -- ('Mental Health'),
  -- ('Health'),
  -- ('Diet'),
  -- ('Career');

  INSERT INTO goals (title, description, due_date, is_public, completed_date, completed, user_id)
  VALUES
  ('Finish Goal Getter', 'Write all the code and post the app', '8/8/2022', true, NULL, false, 1),
  ('Finish Goal Getter', 'Write all the code and post the app', '8/8/2022', true, NULL, false, 2)
  ('Finish Goal Getter', 'Write all the code and post the app', '8/8/2022', true, NULL, false, 3)
  ('Finish Goal Getter', 'Write all the code and post the app', '8/8/2022', true, NULL, false, 4);

  -- INSERT INTO milestones (title, description, due_date, is_public, goal_id, user_id)
  -- VALUES
  -- ('six month mark', 'working out for six months', '1/27/2022', 1, 1, 1),
  -- ('saved $1,000', null, '12/27/2021', 1, 2, 2);

  -- INSERT INTO notes (text, goal_id, milestone_id)
  -- VALUES
  -- ('YAY!', null, 2);