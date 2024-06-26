drop table if exists equipment;
create table equipment (
  equipment_id serial primary key,
  name varchar(255) not null,
  wear_rate integer not null default 0,
  condition integer check (condition >= 0 AND condition <= 100) default 100 not null,
  last_checkup date default current_date not null
);