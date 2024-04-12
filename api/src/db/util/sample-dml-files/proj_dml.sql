INSERT INTO admins (admin_email, first_name, last_name, password)
VALUES
('a.wenonah.dale@gmail.com', 'Wenonah', 'Dale', 'Wenonah'),
('a.karalee.willi@gmail.com', 'Karalee', 'Willi', 'Karalee'),
('a.stoddard.farand@gmail.com', 'Stoddard', 'Farand', 'Stoddard'),
('a.cathryn.shalna@gmail.com', 'Cathryn', 'Shalna', 'Cathryn'),
('a.alma.randi@gmail.com', 'Alma', 'Randi', 'Alma'),
('adminhamza@gmail.com', 'A.Hamza', 'Admin', 'hamza'),
('adminjad@gmail.com', 'A.Jad', 'Admin', 'jad');


INSERT INTO classes (name, description)
VALUES
('Yoga', 'This class aims to help find your inner zen, strength, balance and peace by learning the fundemetals of Yoga'),
('HIIT', 'High Intensity Interval Training gets you sweaty and ready for summer by fousing on muscle strength and endurance'),
('Zumba', 'Combine your love for dancing to create a dynamic calorie burning workout for all fitness levels'),
('Spin', 'Spin your wheels away with EDM and house music to get you pumpin, bumpin, and humpin'),
('CrossFit', 'Has it ever CROSSED your mind to try out a Crossfit class? Participate in our multi-round workouts to get a real sweat going!'),
('Swimming', 'Learn how to swim in case you find yourself on the titanic'),
('Mobility', 'This class aims to help release tightness and prevent future injuries by fousing on mobility and passive stretching'),
('Pilates', 'Pilates is a great social and unique class that has you working muscles you''ve never used!'),
('Strength & Power', 'Join our class to increase your functional strength and lift as heavy as the hulk'),
('Powerlifting','Learn the basics of powerlifting safely with our certified coaches. Open for all fitness levels'),
('Boxing', 'Wanna be like Rocky Balboa? Try our immersive and collabrative boxing class');


INSERT INTO members (member_email, first_name, last_name, password, phone, birthday, gender, current_weight, current_height)
VALUES
('carmita.muire@gmail.com', 'Carmita', 'Muire', 'Carmita', '16136177644', '1966-05-04', 'male', 199, 177),
('lanni.tiffi@gmail.com', 'Lanni', 'Tiffi', 'Lanni', '16137948813', '1968-06-19', 'female', 117, 178),
('jordanna.adelheid@gmail.com', 'Jordanna', 'Adelheid', 'Jordanna', '16134472940', '1971-01-10', 'male', 186, 128),
('nessi.oralla@gmail.com', 'Nessi', 'Oralla', 'Nessi', '16135566496', '2002-04-29', 'male', 189, 173),
('neile.beverly@gmail.com', 'Neile', 'Beverly', 'Neile', '16139038138', '1958-02-24', 'male', 140, 107),
('hamzaalsarakbi@gmail.com', 'Hamza', 'Alsarakbi', 'hamza', '16131234567', '2000-01-01', 'male', 200, 193),
('jadfakhoury@gmail.com', 'Jad', 'Fakhoury', 'jad', '16131234568', '2000-01-02', 'male', 200, 200); 


INSERT INTO rooms (name)
VALUES
('Strength Zone 1'),
('Strength Zone 2'),
('Strength Zone 3'),
('Strength Zone 4'),
('Cardio Corner 1'),
('Cardio Corner 2'),
('Flexibility Studio 1'),
('Flexibility Studio 2'),
('Weightlifting Area 1'),
('Weightlifting Area 2'),
('Weightlifting Area 3'),
('Weightlifting Area 4'),
('Yoga Room 1'),
('Yoga Room 2'),
('Yoga Room 3'),
('Yoga Room 4'),
('Spin Studio 1'),
('Spin Studio 2'),
('Functional Training Zone 1'),
('Functional Training Zone 2'),
('Functional Training Zone 3'),
('Stretching Area 1'),
('Stretching Area 2'),
('Stretching Area 3'),
('Circuit Training Room 1'),
('Circuit Training Room 2'),
('Circuit Training Room 3'),
('Swimming Pool 1'),
('Swimming Pool 2'),
('Martial Arts Room 1'),
('Martial Arts Room 2'),
('Martial Arts Room 3'),
('Martial Arts Room 4'); 


INSERT INTO trainers (trainer_email, first_name, last_name, password, phone, gender)
VALUES
('t.damaris.lorain@gmail.com', 'Damaris', 'Lorain', 'Damaris', '16132151519', 'male'),
('t.stacey.germana@gmail.com', 'Stacey', 'Germana', 'Stacey', '16137861059', 'male'),
('t.izabel.jacqui@gmail.com', 'Izabel', 'Jacqui', 'Izabel', '16133907778', 'female'),
('t.samantha.paulette@gmail.com', 'Samantha', 'Paulette', 'Samantha', '16138666111', 'male'),
('t.karina.cherrita@gmail.com', 'Karina', 'Cherrita', 'Karina', '16137574074', 'female'),
('trainerhamza@gmail.com', 'T.Hamza', 'Trainer', 'hamza', '16131234567', 'male'),
('trainerjad@gmail.com', 'T.Jad', 'Trainer', 'jad', '16131234568', 'male');


INSERT INTO equipment (name, wear_rate, condition, last_checkup)
VALUES
('5 LB Dumbbell #1', 0, 70, '2024-04-02'),
('5 LB Dumbbell #2', 3, 56, '2024-04-02'),
('5 LB Dumbbell #3', 2, 100, '2024-04-02'),
('5 LB Dumbbell #4', 3, 100, '2024-04-02'),
('10 LB Dumbbell #1', 1, 100, '2024-04-02'),
('10 LB Dumbbell #2', 2, 100, '2024-04-02'),
('10 LB Dumbbell #3', 2, 100, '2024-04-02'),
('10 LB Dumbbell #4', 3, 100, '2024-04-02'),
('15 LB Dumbbell #1', 0, 100, '2024-04-02'),
('15 LB Dumbbell #2', 4, 100, '2024-04-02'),
('15 LB Dumbbell #3', 4, 100, '2024-04-02'),
('15 LB Dumbbell #4', 2, 100, '2024-04-02'),
('20 LB Dumbbell #1', 2, 100, '2024-04-02'),
('20 LB Dumbbell #2', 2, 100, '2024-04-02'),
('20 LB Dumbbell #3', 2, 100, '2024-04-02'),
('20 LB Dumbbell #4', 0, 100, '2024-04-02'),
('25 LB Dumbbell #1', 3, 100, '2024-04-02'),
('25 LB Dumbbell #2', 4, 100, '2024-04-02'),
('25 LB Dumbbell #3', 4, 100, '2024-04-02'),
('25 LB Dumbbell #4', 3, 100, '2024-04-02'),
('30 LB Dumbbell #1', 4, 100, '2024-04-02'),
('30 LB Dumbbell #2', 2, 100, '2024-04-02'),
('30 LB Dumbbell #3', 0, 100, '2024-04-02'),
('30 LB Dumbbell #4', 3, 100, '2024-04-02'),
('35 LB Dumbbell #1', 2, 100, '2024-04-02'),
('35 LB Dumbbell #2', 2, 100, '2024-04-02'),
('35 LB Dumbbell #3', 0, 100, '2024-04-02'),
('35 LB Dumbbell #4', 1, 100, '2024-04-02'),
('40 LB Dumbbell #1', 4, 100, '2024-04-02'),
('40 LB Dumbbell #2', 3, 100, '2024-04-02'),
('40 LB Dumbbell #3', 4, 100, '2024-04-02'),
('40 LB Dumbbell #4', 1, 100, '2024-04-02'),
('45 LB Dumbbell #1', 0, 100, '2024-04-02'),
('45 LB Dumbbell #2', 3, 100, '2024-04-02'),
('45 LB Dumbbell #3', 4, 100, '2024-04-02'),
('45 LB Dumbbell #4', 4, 100, '2024-04-02'),
('50 LB Dumbbell #1', 3, 100, '2024-04-02'),
('50 LB Dumbbell #2', 3, 100, '2024-04-02'),
('50 LB Dumbbell #3', 2, 100, '2024-04-02'),
('50 LB Dumbbell #4', 2, 100, '2024-04-02'),
('55 LB Dumbbell #1', 2, 100, '2024-04-02'),
('55 LB Dumbbell #2', 0, 100, '2024-04-02'),
('55 LB Dumbbell #3', 3, 100, '2024-04-02'),
('55 LB Dumbbell #4', 2, 100, '2024-04-02'),
('60 LB Dumbbell #1', 3, 100, '2024-04-02'),
('60 LB Dumbbell #2', 3, 100, '2024-04-02'),
('60 LB Dumbbell #3', 3, 100, '2024-04-02'),
('60 LB Dumbbell #4', 1, 100, '2024-04-02'),
('65 LB Dumbbell #1', 3, 100, '2024-04-02'),
('65 LB Dumbbell #2', 2, 100, '2024-04-02'),
('65 LB Dumbbell #3', 2, 100, '2024-04-02'),
('65 LB Dumbbell #4', 2, 100, '2024-04-02'),
('70 LB Dumbbell #1', 2, 100, '2024-04-02'),
('70 LB Dumbbell #2', 1, 100, '2024-04-02'),
('70 LB Dumbbell #3', 2, 100, '2024-04-02'),
('70 LB Dumbbell #4', 0, 100, '2024-04-02'),
('75 LB Dumbbell #1', 1, 100, '2024-04-02'),
('75 LB Dumbbell #2', 3, 100, '2024-04-02'),
('75 LB Dumbbell #3', 0, 100, '2024-04-02'),
('75 LB Dumbbell #4', 1, 100, '2024-04-02'),
('80 LB Dumbbell #1', 1, 100, '2024-04-02'),
('80 LB Dumbbell #2', 1, 100, '2024-04-02'),
('80 LB Dumbbell #3', 4, 100, '2024-04-02'),
('80 LB Dumbbell #4', 4, 100, '2024-04-02'),
('85 LB Dumbbell #1', 3, 100, '2024-04-02'),
('85 LB Dumbbell #2', 0, 100, '2024-04-02'),
('85 LB Dumbbell #3', 4, 100, '2024-04-02'),
('85 LB Dumbbell #4', 4, 100, '2024-04-02'),
('90 LB Dumbbell #1', 0, 100, '2024-04-02'),
('90 LB Dumbbell #2', 1, 100, '2024-04-02'),
('90 LB Dumbbell #3', 0, 100, '2024-04-02'),
('90 LB Dumbbell #4', 0, 100, '2024-04-02'),
('95 LB Dumbbell #1', 2, 100, '2024-04-02'),
('95 LB Dumbbell #2', 3, 100, '2024-04-02'),
('95 LB Dumbbell #3', 1, 100, '2024-04-02'),
('95 LB Dumbbell #4', 1, 100, '2024-04-02'),
('100 LB Dumbbell #1', 3, 100, '2024-04-02'),
('100 LB Dumbbell #2', 0, 100, '2024-04-02'),
('100 LB Dumbbell #3', 0, 100, '2024-04-02'),
('100 LB Dumbbell #4', 1, 100, '2024-04-02'),
('5 LB Kettlebell #1', 1, 100, '2024-04-02'),
('5 LB Kettlebell #2', 4, 100, '2024-04-02'),
('5 LB Kettlebell #3', 1, 100, '2024-04-02'),
('5 LB Kettlebell #4', 4, 100, '2024-04-02'),
('10 LB Kettlebell #1', 3, 100, '2024-04-02'),
('10 LB Kettlebell #2', 4, 100, '2024-04-02'),
('10 LB Kettlebell #3', 2, 100, '2024-04-02'),
('10 LB Kettlebell #4', 2, 100, '2024-04-02'),
('15 LB Kettlebell #1', 2, 100, '2024-04-02'),
('15 LB Kettlebell #2', 1, 100, '2024-04-02'),
('15 LB Kettlebell #3', 0, 100, '2024-04-02'),
('15 LB Kettlebell #4', 2, 100, '2024-04-02'),
('20 LB Kettlebell #1', 3, 100, '2024-04-02'),
('20 LB Kettlebell #2', 0, 100, '2024-04-02'),
('20 LB Kettlebell #3', 0, 100, '2024-04-02'),
('20 LB Kettlebell #4', 0, 100, '2024-04-02'),
('25 LB Kettlebell #1', 4, 100, '2024-04-02'),
('25 LB Kettlebell #2', 0, 100, '2024-04-02'),
('25 LB Kettlebell #3', 3, 100, '2024-04-02'),
('25 LB Kettlebell #4', 4, 100, '2024-04-02'),
('30 LB Kettlebell #1', 3, 100, '2024-04-02'),
('30 LB Kettlebell #2', 4, 100, '2024-04-02'),
('30 LB Kettlebell #3', 3, 100, '2024-04-02'),
('30 LB Kettlebell #4', 4, 100, '2024-04-02'),
('35 LB Kettlebell #1', 2, 100, '2024-04-02'),
('35 LB Kettlebell #2', 2, 100, '2024-04-02'),
('35 LB Kettlebell #3', 0, 100, '2024-04-02'),
('35 LB Kettlebell #4', 4, 100, '2024-04-02'),
('40 LB Kettlebell #1', 0, 100, '2024-04-02'),
('40 LB Kettlebell #2', 2, 100, '2024-04-02'),
('40 LB Kettlebell #3', 3, 100, '2024-04-02'),
('40 LB Kettlebell #4', 2, 100, '2024-04-02'),
('45 LB Kettlebell #1', 3, 100, '2024-04-02'),
('45 LB Kettlebell #2', 3, 100, '2024-04-02'),
('45 LB Kettlebell #3', 4, 100, '2024-04-02'),
('45 LB Kettlebell #4', 1, 100, '2024-04-02'),
('50 LB Kettlebell #1', 2, 100, '2024-04-02'),
('50 LB Kettlebell #2', 4, 100, '2024-04-02'),
('50 LB Kettlebell #3', 2, 100, '2024-04-02'),
('50 LB Kettlebell #4', 0, 100, '2024-04-02'),
('55 LB Kettlebell #1', 3, 100, '2024-04-02'),
('55 LB Kettlebell #2', 0, 100, '2024-04-02'),
('55 LB Kettlebell #3', 4, 100, '2024-04-02'),
('55 LB Kettlebell #4', 0, 100, '2024-04-02'),
('60 LB Kettlebell #1', 1, 100, '2024-04-02'),
('60 LB Kettlebell #2', 2, 100, '2024-04-02'),
('60 LB Kettlebell #3', 4, 100, '2024-04-02'),
('60 LB Kettlebell #4', 2, 100, '2024-04-02'),
('65 LB Kettlebell #1', 0, 100, '2024-04-02'),
('65 LB Kettlebell #2', 1, 100, '2024-04-02'),
('65 LB Kettlebell #3', 2, 100, '2024-04-02'),
('65 LB Kettlebell #4', 0, 100, '2024-04-02'),
('70 LB Kettlebell #1', 3, 100, '2024-04-02'),
('70 LB Kettlebell #2', 4, 100, '2024-04-02'),
('70 LB Kettlebell #3', 2, 100, '2024-04-02'),
('70 LB Kettlebell #4', 3, 100, '2024-04-02'),
('75 LB Kettlebell #1', 4, 100, '2024-04-02'),
('75 LB Kettlebell #2', 4, 100, '2024-04-02'),
('75 LB Kettlebell #3', 1, 100, '2024-04-02'),
('75 LB Kettlebell #4', 2, 100, '2024-04-02'),
('80 LB Kettlebell #1', 4, 100, '2024-04-02'),
('80 LB Kettlebell #2', 1, 100, '2024-04-02'),
('80 LB Kettlebell #3', 2, 100, '2024-04-02'),
('80 LB Kettlebell #4', 3, 100, '2024-04-02'),
('85 LB Kettlebell #1', 2, 100, '2024-04-02'),
('85 LB Kettlebell #2', 3, 100, '2024-04-02'),
('85 LB Kettlebell #3', 4, 100, '2024-04-02'),
('85 LB Kettlebell #4', 2, 100, '2024-04-02'),
('90 LB Kettlebell #1', 4, 100, '2024-04-02'),
('90 LB Kettlebell #2', 2, 100, '2024-04-02'),
('90 LB Kettlebell #3', 3, 100, '2024-04-02'),
('90 LB Kettlebell #4', 4, 100, '2024-04-02'),
('95 LB Kettlebell #1', 2, 100, '2024-04-02'),
('95 LB Kettlebell #2', 0, 100, '2024-04-02'),
('95 LB Kettlebell #3', 3, 100, '2024-04-02'),
('95 LB Kettlebell #4', 2, 100, '2024-04-02'),
('100 LB Kettlebell #1', 4, 100, '2024-04-02'),
('100 LB Kettlebell #2', 3, 100, '2024-04-02'),
('100 LB Kettlebell #3', 2, 100, '2024-04-02'),
('100 LB Kettlebell #4', 0, 100, '2024-04-02'),
('5 LB Plate #1', 2, 100, '2024-04-02'),
('5 LB Plate #2', 3, 100, '2024-04-02'),
('5 LB Plate #3', 3, 100, '2024-04-02'),
('5 LB Plate #4', 2, 100, '2024-04-02'),
('10 LB Plate #1', 0, 100, '2024-04-02'),
('10 LB Plate #2', 1, 100, '2024-04-02'),
('10 LB Plate #3', 1, 100, '2024-04-02'),
('10 LB Plate #4', 4, 100, '2024-04-02'),
('20 LB Plate #1', 2, 100, '2024-04-02'),
('20 LB Plate #2', 4, 100, '2024-04-02'),
('20 LB Plate #3', 0, 100, '2024-04-02'),
('20 LB Plate #4', 2, 100, '2024-04-02'),
('25 LB Plate #1', 2, 100, '2024-04-02'),
('25 LB Plate #2', 4, 100, '2024-04-02'),
('25 LB Plate #3', 2, 100, '2024-04-02'),
('25 LB Plate #4', 4, 100, '2024-04-02'),
('35 LB Plate #1', 4, 100, '2024-04-02'),
('35 LB Plate #2', 3, 100, '2024-04-02'),
('35 LB Plate #3', 1, 100, '2024-04-02'),
('35 LB Plate #4', 0, 100, '2024-04-02'),
('45 LB Plate #1', 4, 100, '2024-04-02'),
('45 LB Plate #2', 1, 100, '2024-04-02'),
('45 LB Plate #3', 3, 100, '2024-04-02'),
('45 LB Plate #4', 2, 100, '2024-04-02'),
('10 LB Barbell #1', 1, 100, '2024-04-02'),
('10 LB Barbell #2', 3, 100, '2024-04-02'),
('10 LB Barbell #3', 2, 100, '2024-04-02'),
('10 LB Barbell #4', 1, 100, '2024-04-02'),
('20 LB Barbell #1', 3, 100, '2024-04-02'),
('20 LB Barbell #2', 2, 100, '2024-04-02'),
('20 LB Barbell #3', 0, 100, '2024-04-02'),
('20 LB Barbell #4', 0, 100, '2024-04-02'),
('30 LB Barbell #1', 4, 100, '2024-04-02'),
('30 LB Barbell #2', 0, 100, '2024-04-02'),
('30 LB Barbell #3', 0, 100, '2024-04-02'),
('30 LB Barbell #4', 3, 100, '2024-04-02'),
('40 LB Barbell #1', 4, 100, '2024-04-02'),
('40 LB Barbell #2', 3, 100, '2024-04-02'),
('40 LB Barbell #3', 2, 100, '2024-04-02'),
('40 LB Barbell #4', 0, 100, '2024-04-02'),
('50 LB Barbell #1', 4, 100, '2024-04-02'),
('50 LB Barbell #2', 3, 100, '2024-04-02'),
('50 LB Barbell #3', 4, 100, '2024-04-02'),
('50 LB Barbell #4', 0, 100, '2024-04-02'),
('60 LB Barbell #1', 0, 100, '2024-04-02'),
('60 LB Barbell #2', 4, 100, '2024-04-02'),
('60 LB Barbell #3', 2, 100, '2024-04-02'),
('60 LB Barbell #4', 2, 100, '2024-04-02'),
('70 LB Barbell #1', 0, 100, '2024-04-02'),
('70 LB Barbell #2', 2, 100, '2024-04-02'),
('70 LB Barbell #3', 0, 100, '2024-04-02'),
('70 LB Barbell #4', 0, 100, '2024-04-02'),
('80 LB Barbell #1', 4, 100, '2024-04-02'),
('80 LB Barbell #2', 3, 100, '2024-04-02'),
('80 LB Barbell #3', 0, 100, '2024-04-02'),
('80 LB Barbell #4', 0, 100, '2024-04-02'),
('90 LB Barbell #1', 1, 100, '2024-04-02'),
('90 LB Barbell #2', 1, 100, '2024-04-02'),
('90 LB Barbell #3', 4, 100, '2024-04-02'),
('90 LB Barbell #4', 4, 100, '2024-04-02'),
('100 LB Barbell #1', 4, 100, '2024-04-02'),
('100 LB Barbell #2', 4, 100, '2024-04-02'),
('100 LB Barbell #3', 1, 100, '2024-04-02'),
('100 LB Barbell #4', 0, 100, '2024-04-02'),
('10 LB EZ Barbell #1', 1, 100, '2024-04-02'),
('10 LB EZ Barbell #2', 3, 100, '2024-04-02'),
('10 LB EZ Barbell #3', 2, 100, '2024-04-02'),
('10 LB EZ Barbell #4', 0, 100, '2024-04-02'),
('20 LB EZ Barbell #1', 3, 100, '2024-04-02'),
('20 LB EZ Barbell #2', 1, 100, '2024-04-02'),
('20 LB EZ Barbell #3', 4, 100, '2024-04-02'),
('20 LB EZ Barbell #4', 1, 100, '2024-04-02'),
('30 LB EZ Barbell #1', 4, 100, '2024-04-02'),
('30 LB EZ Barbell #2', 4, 100, '2024-04-02'),
('30 LB EZ Barbell #3', 3, 100, '2024-04-02'),
('30 LB EZ Barbell #4', 2, 100, '2024-04-02'),
('40 LB EZ Barbell #1', 2, 100, '2024-04-02'),
('40 LB EZ Barbell #2', 0, 100, '2024-04-02'),
('40 LB EZ Barbell #3', 0, 100, '2024-04-02'),
('40 LB EZ Barbell #4', 0, 100, '2024-04-02'),
('50 LB EZ Barbell #1', 3, 100, '2024-04-02'),
('50 LB EZ Barbell #2', 1, 100, '2024-04-02'),
('50 LB EZ Barbell #3', 2, 100, '2024-04-02'),
('50 LB EZ Barbell #4', 0, 100, '2024-04-02'),
('60 LB EZ Barbell #1', 1, 100, '2024-04-02'),
('60 LB EZ Barbell #2', 4, 100, '2024-04-02'),
('60 LB EZ Barbell #3', 1, 100, '2024-04-02'),
('60 LB EZ Barbell #4', 3, 100, '2024-04-02'),
('70 LB EZ Barbell #1', 4, 100, '2024-04-02'),
('70 LB EZ Barbell #2', 0, 100, '2024-04-02'),
('70 LB EZ Barbell #3', 2, 100, '2024-04-02'),
('70 LB EZ Barbell #4', 0, 100, '2024-04-02'),
('80 LB EZ Barbell #1', 3, 100, '2024-04-02'),
('80 LB EZ Barbell #2', 2, 100, '2024-04-02'),
('80 LB EZ Barbell #3', 4, 100, '2024-04-02'),
('80 LB EZ Barbell #4', 2, 100, '2024-04-02'),
('90 LB EZ Barbell #1', 3, 100, '2024-04-02'),
('90 LB EZ Barbell #2', 1, 100, '2024-04-02'),
('90 LB EZ Barbell #3', 3, 100, '2024-04-02'),
('90 LB EZ Barbell #4', 4, 100, '2024-04-02'),
('100 LB EZ Barbell #1', 4, 100, '2024-04-02'),
('100 LB EZ Barbell #2', 4, 100, '2024-04-02'),
('100 LB EZ Barbell #3', 3, 100, '2024-04-02'),
('100 LB EZ Barbell #4', 3, 100, '2024-04-02'),
('Long Bar #1', 2, 100, '2024-04-02'),
('Long Bar #2', 2, 100, '2024-04-02'),
('Long Bar #3', 1, 100, '2024-04-02'),
('Long Bar #4', 4, 100, '2024-04-02'),
('Short Bar #1', 0, 100, '2024-04-02'),
('Short Bar #2', 2, 100, '2024-04-02'),
('Short Bar #3', 0, 100, '2024-04-02'),
('Short Bar #4', 2, 100, '2024-04-02'),
('EZ Curl Bar #1', 0, 100, '2024-04-02'),
('EZ Curl Bar #2', 0, 100, '2024-04-02'),
('EZ Curl Bar #3', 0, 100, '2024-04-02'),
('EZ Curl Bar #4', 0, 100, '2024-04-02'),
('Bench #1', 3, 100, '2024-04-02'),
('Bench #2', 2, 100, '2024-04-02'),
('Bench #3', 3, 100, '2024-04-02'),
('Bench #4', 2, 100, '2024-04-02'),
('Squat Rack #1', 4, 100, '2024-04-02'),
('Squat Rack #2', 1, 100, '2024-04-02'),
('Squat Rack #3', 1, 100, '2024-04-02'),
('Squat Rack #4', 3, 100, '2024-04-02'),
('Pull-Up Bar #1', 1, 100, '2024-04-02'),
('Pull-Up Bar #2', 0, 100, '2024-04-02'),
('Pull-Up Bar #3', 3, 100, '2024-04-02'),
('Pull-Up Bar #4', 4, 100, '2024-04-02'),
('Dip Station #1', 0, 100, '2024-04-02'),
('Dip Station #2', 2, 100, '2024-04-02'),
('Dip Station #3', 2, 100, '2024-04-02'),
('Dip Station #4', 3, 100, '2024-04-02'),
('Preacher Curl Bench #1', 3, 100, '2024-04-02'),
('Preacher Curl Bench #2', 3, 100, '2024-04-02'),
('Preacher Curl Bench #3', 0, 100, '2024-04-02'),
('Preacher Curl Bench #4', 3, 100, '2024-04-02'),
('Cable Machine #1', 0, 100, '2024-04-02'),
('Cable Machine #2', 3, 100, '2024-04-02'),
('Cable Machine #3', 1, 100, '2024-04-02'),
('Cable Machine #4', 0, 100, '2024-04-02'),
('Leg press Machine #1', 4, 100, '2024-04-02'),
('Leg press Machine #2', 4, 100, '2024-04-02'),
('Leg press Machine #3', 4, 100, '2024-04-02'),
('Leg press Machine #4', 2, 100, '2024-04-02'),
('Leg Curl Machine #1', 2, 100, '2024-04-02'),
('Leg Curl Machine #2', 4, 100, '2024-04-02'),
('Leg Curl Machine #3', 2, 100, '2024-04-02'),
('Leg Curl Machine #4', 4, 100, '2024-04-02'),
('Leg extension Machine #1', 3, 100, '2024-04-02'),
('Leg extension Machine #2', 3, 100, '2024-04-02'),
('Leg extension Machine #3', 3, 100, '2024-04-02'),
('Leg extension Machine #4', 4, 100, '2024-04-02'),
('Rowing Machine #1', 2, 100, '2024-04-02'),
('Rowing Machine #2', 2, 100, '2024-04-02'),
('Rowing Machine #3', 0, 100, '2024-04-02'),
('Rowing Machine #4', 1, 100, '2024-04-02'),
('Rowing Machine #1', 0, 100, '2024-04-02'),
('Rowing Machine #2', 0, 100, '2024-04-02'),
('Rowing Machine #3', 0, 100, '2024-04-02'),
('Rowing Machine #4', 4, 100, '2024-04-02'),
('Stairmaster Machine #1', 1, 100, '2024-04-02'),
('Stairmaster Machine #2', 3, 100, '2024-04-02'),
('Stairmaster Machine #3', 1, 100, '2024-04-02'),
('Stairmaster Machine #4', 0, 100, '2024-04-02'),
('Lat Pulldown Machine #1', 2, 100, '2024-04-02'),
('Lat Pulldown Machine #2', 2, 100, '2024-04-02'),
('Lat Pulldown Machine #3', 1, 100, '2024-04-02'),
('Lat Pulldown Machine #4', 4, 100, '2024-04-02'),
('Smith Machine #1', 2, 100, '2024-04-02'),
('Smith Machine #2', 0, 100, '2024-04-02'),
('Smith Machine #3', 2, 100, '2024-04-02'),
('Smith Machine #4', 3, 100, '2024-04-02'),
('Treadmill #1', 1, 100, '2024-04-02'),
('Treadmill #2', 2, 100, '2024-04-02'),
('Treadmill #3', 0, 100, '2024-04-02'),
('Treadmill #4', 3, 100, '2024-04-02'),
('Ellipticals #1', 2, 100, '2024-04-02'),
('Ellipticals #2', 4, 100, '2024-04-02'),
('Ellipticals #3', 2, 100, '2024-04-02'),
('Ellipticals #4', 1, 100, '2024-04-02'),
('Exercise Bike #1', 3, 100, '2024-04-02'),
('Exercise Bike #2', 4, 100, '2024-04-02'),
('Exercise Bike #3', 1, 100, '2024-04-02'),
('Exercise Bike #4', 4, 100, '2024-04-02'),
('Air Bike #1', 4, 100, '2024-04-02'),
('Air Bike #2', 2, 100, '2024-04-02'),
('Air Bike #3', 0, 100, '2024-04-02'),
('Air Bike #4', 1, 100, '2024-04-02'),
('Rower #1', 4, 100, '2024-04-02'),
('Rower #2', 0, 100, '2024-04-02'),
('Rower #3', 3, 100, '2024-04-02'),
('Rower #4', 2, 100, '2024-04-02'),
('Climber #1', 1, 100, '2024-04-02'),
('Climber #2', 2, 100, '2024-04-02'),
('Climber #3', 2, 100, '2024-04-02'),
('Climber #4', 1, 100, '2024-04-02'),
('Stair-Stepper #1', 0, 100, '2024-04-02'),
('Stair-Stepper #2', 2, 100, '2024-04-02'),
('Stair-Stepper #3', 1, 100, '2024-04-02'),
('Stair-Stepper #4', 2, 100, '2024-04-02');