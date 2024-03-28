drop table if exists trainers;
create table trainers (
    trainer_email varchar(255) unique primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null,
    phone varchar(11) not null,
    gender varchar(6) not null
);
