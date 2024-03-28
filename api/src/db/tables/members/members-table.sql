drop table if exists members;
create table members (
    member_email varchar(255) unique primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null,
    phone varchar(11) not null,
    birthday date not null,
    gender varchar(6) not null,
    current_weight int not null,
    current_height int not null
);
