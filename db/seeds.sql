create table users (
user_id serial primary key,
username varchar, 
password text, 
email varchar, 
name varchar, 
bio varchar(140), 
rating int, 
profile_pic text
)

create table survey_questions (
question_id serial primary key,
question_text varchar,
example_text varchar
)

create table answers (
date DATE,
question_id int,
answer_val int, 
user_id int,
questionee_id int
)

alter table answers
add foreign key (question_id) references survey_questions (question_id)

alter table answers
add foreign key (user_id) references users (user_id)

alter table answers
add foreign key (questionee_id) references users (user_id)

insert into survey_questions (question_text, example_text)
values ('Planning', 'How much thought was put into the date?');

insert into survey_questions (question_text, example_text)
values ('First Impression', 'Did reality match the profile picture?');

insert into survey_questions (question_text, example_text)
values ('Manners', 'Table manners, politeness');

insert into survey_questions (question_text, example_text)
values ('Hygiene', 'How was their breath, too much perfume/cologne?');

insert into survey_questions (question_text, example_text)
values ('Presentation', 'Did they dress well for the date?');

insert into survey_questions (question_text, example_text)
values ('Confidence', 'Eye contact, willing to initiate conversation?');

insert into survey_questions (question_text, example_text)
values ('Conversation', 'Did they listen? Did their responses keep conversation going?');

insert into survey_questions (question_text, example_text)
values ('Punctuality', 'Did they show up on time?');
