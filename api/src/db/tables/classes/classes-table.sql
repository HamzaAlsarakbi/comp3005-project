drop table if exists classes;
create table classes (
  class_id serial primary key,
  name varchar(255) not null,
  
  description text not null
);