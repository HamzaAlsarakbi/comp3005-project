drop table if exists rooms cascade;
create table rooms (
  room_id serial primary key,
  name varchar(255) not null
);