drop table if exists members cascade;
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
drop table if exists health_goals;
create table health_goals (
    health_goal_id serial primary key,
    member_email varchar(255),
    description text not null,
    timeline Date not null,
    foreign key (member_email) references members(member_email) on delete cascade
);
drop table if exists routines;
create table routines (
    routine_id serial primary key,
    member_email varchar(255),
    foreign key (member_email) references members(member_email) on delete cascade
);