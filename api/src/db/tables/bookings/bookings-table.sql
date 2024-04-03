drop table if exists bookings cascade;
create table bookings (
  booking_id serial primary key,
  type varchar(8) check (type in ('personal', 'group', 'other')) not null,
  room_id int not null,
  class_id int default null,
  start_time timestamp not null,
  end_time timestamp not null,
  status varchar(9) check(status in('scheduled', 'cancelled')) default 'scheduled',
  capacity int check(capacity >= 2 and capacity <= 21) not null default 21,
  foreign key (room_id) references rooms(room_id) on delete set null,
  foreign key (class_id) references classes(class_id) on delete set null
);