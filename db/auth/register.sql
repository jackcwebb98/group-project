insert into users (username, password, email)
values (${username}, ${password}, ${email})
returning user_id, username, email