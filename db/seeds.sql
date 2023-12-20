INSERT INTO department (name)
VALUES ("Enrollment"),
       ("Academics"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Enrollment Representative", 40000, 1),
('Enrollment Manager', 60000, 1), 
       ("Academic Advisor", 30000, 2),
       ('Dean', 75000, 2),
       ("Finance Advisor", 25000, 3),
       ("Finance Manager", 65000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, NULL),
       ("Mary", "Bow", 1, 1),
       ("Ezra", "Thumb", 4, NULL),
       ("Happy", "Days", 6, NULL),
       ("New", "Employee", 5, 4),
       ("Ben", "Good", 3, 3);
       
