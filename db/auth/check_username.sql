select count(*) from users
where username = ${username} or email = ${email}