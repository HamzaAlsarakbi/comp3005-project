drop table if exists member_schedules;
create table member_schedules (
    schedule_id serial primary key,
    member_email varchar(255),
    booking_id int,
    foreign key (member_email) references members(member_email) on delete cascade,
    foreign key (booking_id) references bookings(booking_id) on delete cascade
);