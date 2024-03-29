drop table if exists classes;
create table classes (
  class_id serial primary key,
  name varchar(255) not null,
  type varchar(8) check (type in ('personal', 'group')) not null,
  capacity int check(capacity >= 2 and capacity <= 21) not null default 21,
  description text not null
);