drop table if exists classes;
create table classes (
  class_id serial primary key,
  name varchar(255) not null,
  type varchar(8) check (type in ('personal', 'group')) not null,
  description text not null
);