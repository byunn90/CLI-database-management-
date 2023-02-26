-- Insert row into 

INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('IT');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 100000, 1),
  ('Marketing Coordinator', 50000, 2),
  ('IT Manager', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, 1),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 1),
  ('Alice', 'Lee', 2, 1),
  ('Peter', 'Kim', 1, 2),
  ('Karen', 'Chen', 2, 3);