update users 
set profile_pic = ${profile_pic}
where user_id = ${user_id}
returning profile_pic