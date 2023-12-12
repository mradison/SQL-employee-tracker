INSERT INTO department (id, name)
VALUES (1, "Enrollment"),
       (2, "Academics"),
       (3, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Enrollment Representative", 40000, 1),
       (2, "Academic Advisor", 30000, 2),
       (3, "Finance Advisor", 25000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, NULL),
       (2, "Mary", "Bow", 2, NULL),
       (3, "Ezra", "Thumb", 3, NULL),
       (4, "Happy", "Days", 1, 1),
       (5, "New", "Employee", 2, 2),
       (6, "Ben", "Good", 3, 3);
       
