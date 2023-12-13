INSERT INTO department (department_name)
VALUES ("Enrollment"),
       ("Academics"),
       ("Finance");

INSERT INTO position (title, salary, department_id)
VALUES ("Enrollment Representative", 40000, 1),
       ("Academic Advisor", 30000, 2),
       ("Finance Advisor", 25000, 3);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("John", "Doe", 1, 1),
       ("Mary", "Bow", 2, 2),
       ("Ezra", "Thumb", 3, 3),
       ("Happy", "Days", 1, 1),
       ("New", "Employee", 2, 2),
       ("Ben", "Good", 3, 3);
       
