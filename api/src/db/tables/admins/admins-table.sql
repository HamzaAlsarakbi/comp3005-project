drop table if exists admins;
create table admins (
    admin_email varchar(255) unique primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null
);
