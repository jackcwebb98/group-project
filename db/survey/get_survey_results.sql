select avg(answer_val), question_id
from answers
where questionee_id = $1
group by question_id