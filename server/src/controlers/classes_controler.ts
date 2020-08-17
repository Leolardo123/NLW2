import {Request, Response} from 'express';
import db from '../database/conection';
import convertHourToMinutes from '../database/utils/convertHtoM';

interface ScheduleItem{
    week_day: number,
    from: string,
    to:string,
}

export default class ClassesController {
    async index(request: Request, response: Response) {

        try {
            const filters = request.query;

            const subject = filters.subject as string;
            const week_day = filters.week_day as string;
            const time = filters.time as string;
        
            if (!filters.subject || !filters.week_day || !filters.time) {
                response.status(400).json({message:"Missing Filter for requested search"})
            }
    
            const timeInMinutes = convertHourToMinutes(time);
    
            console.log(timeInMinutes);

            const classes = await db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*').from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day`= ??', [Number(week_day)])
                        .whereRaw('`class_schedule`.`from`<= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to`> ??',[timeInMinutes])//Aula precisa durar pelo menos uma hora
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*','users.*'])
    
            return response.json(classes);

        } catch (err) {

            return response.send(400).json({ message: "Not Found", error: err })
            
        }
       
    }
    async create(request: Request, response: Response){
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();

    try {
        const insertedUsersIds = await trx('users').insert({
            name: name,
            avatar: avatar,
            whatsapp: whatsapp,
            bio: bio
        })

        const user_id = insertedUsersIds[0];

        const insertedCLassesId = await trx('classes').insert({
            subject,
            cost,
            user_id,
        })

        const class_id = insertedCLassesId[0];

        const classSchedule = schedule.map((scheduleiItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleiItem.week_day,
                from: convertHourToMinutes(scheduleiItem.from),
                to: convertHourToMinutes(scheduleiItem.to)
            }
        })

        await trx('class_schedule').insert(classSchedule);

        await trx.commit();

        return response.status(201).json()
    } catch (err) {
        await trx.rollback();
        return response.status(400).json({error:"Unexpected error while creating new class"+"\n"+err})
    }
    
}
}