drop table if exists class_bookings;
create table class_bookings (
  booking_id serial primary key,
  class_id int,
  room_number integer check (room_number > 0) not null,
  time time not null,
  trainer_email varchar(255),
  foreign key (class_id) references classes(class_id) on delete null,
  foreign key (trainer_email) references trainers(trainer_email) on delete null,
);