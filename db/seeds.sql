INSERT INTO department (name)
VALUES ("Maintenance"),
("Store"),
("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Greeter", 20000, 3),
("Salesperson", 60000, 2),
("Mechanic", 40000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Smith", 1, null),
("Susan", "Willis", 1, 1),
("Kathleen", "Bole", 2, null),
("Ryan", "McFadden", 2, 3),
("Gina", "Im", 3, null),
("Audrey", "Carlson", 3, 5);

