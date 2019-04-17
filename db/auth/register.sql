insert into users (username, password, email, name, bio, profile_pic)
values (${username}, ${password}, ${email}, ${name}, ${bio}, ${profile_pic})
returning user_id, username, email, profile_pic