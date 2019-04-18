select date, avg(answer_val)
from answers 
where questionee_id = 2
group by date 
order by date asc