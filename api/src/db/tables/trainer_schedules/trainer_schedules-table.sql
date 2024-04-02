drop table if exists trainer_schedules;
create table trainer_schedules (
    schedule_id serial primary key,
    trainer_email varchar(255),
    booking_id int,
    foreign key (trainer_email) references trainers(trainer_email) on delete cascade,
    foreign key (booking_id) references bookings(booking_id) on delete cascade
);