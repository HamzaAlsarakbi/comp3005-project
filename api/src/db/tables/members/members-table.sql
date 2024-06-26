drop table if exists members cascade;
create table members (
    member_email varchar(255) unique primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null,
    phone varchar(11) not null,
    birthday date not null,
    gender varchar(6) not null,
    current_weight int,
    current_height int
);
drop table if exists health_goals;
create table health_goals (
    health_goal_id serial primary key,
    member_email varchar(255),
    description text not null,
    foreign key (member_email) references members(member_email) on delete cascade
);
drop table if exists routines;
create table routines (
    routine_id serial primary key,
    member_email varchar(255),
    description text not null,
    foreign key (member_email) references members(member_email) on delete cascade
);
drop table if exists payments;
create table payments (
    payment_id serial primary key,
    member_email varchar(255),
    amount int check(amount > 0) not null,
    status varchar(9) check(status in ('processed', 'pending', 'cancelled')) not null default 'pending',
    due_date date not null default current_date + interval '14 day',
    foreign key (member_email) references members(member_email) on delete set null
);

drop table if exists fitness_achievements;
create table fitness_achievements (
    fitness_achievements_id serial primary key,
    member_email varchar(255),
    description text not null,
    foreign key (member_email) references members(member_email) on delete cascade
);