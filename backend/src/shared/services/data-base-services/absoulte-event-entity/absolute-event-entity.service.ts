import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessThanOrEqual, MoreThanOrEqual, Repository} from "typeorm";
import {AbsoluteEvent} from "../../../entities/absolute-event.entity";
import {EventCategoryEnum} from "../../../enum/event-category.enum";
import {EventPriorityEnum} from "../../../enum/event-priority.enum";
import {RepeatTypeEnum} from "../../../enum/repeat-type.enum";
import {EventAlarm} from "../../../classes/event-alarm";


export class AbsoluteEventEntity{
    id?: number;
    user_id: number;
    name: string;
    priority: EventPriorityEnum = EventPriorityEnum.NONE;
    flexible: boolean = false;
    start_date: Date;
    end_date: Date;
    whole_day: boolean;
    start_time: Date;
    end_time: Date;
    repeat: boolean;
    repeat_type?: RepeatTypeEnum;
    repeat_interval?: number;
    location: string;
    category: EventCategoryEnum;
    description: string;
    alarms?: EventAlarm[];
}

@Injectable()
export class AbsoluteEventEntityService {
    constructor(
        @InjectRepository(AbsoluteEvent)
        private absoluteEventRepository: Repository<AbsoluteEvent>,
    ) {}

    async createAbsoluteEvent(absoluteEvent: AbsoluteEventEntity){
        const categoryValue = typeof absoluteEvent.category === 'string'
            ? EventCategoryEnum[absoluteEvent.category as keyof typeof EventCategoryEnum] : absoluteEvent.category;
        let newAbsoluteEvent:any;
         newAbsoluteEvent = this.absoluteEventRepository.create(
            {
                user_id: absoluteEvent.user_id,
                name: absoluteEvent.name,
                priority: absoluteEvent.priority,
                flexible: absoluteEvent.flexible,
                start_date: absoluteEvent.start_date,
                end_date: absoluteEvent.end_date,
                whole_day: absoluteEvent.whole_day,
                start_time: absoluteEvent.start_time,
                end_time: absoluteEvent.end_time,
                repeat: false,
                repeat_type: absoluteEvent.repeat_type,
                repeat_interval: absoluteEvent.repeat_interval,
                location: absoluteEvent.location,
                category: categoryValue,
                description: absoluteEvent.description,
                alarms: absoluteEvent.alarms
            }
        );
        return this.absoluteEventRepository.save(newAbsoluteEvent);
    }

    async getUserEvents(userId: number){
        return this.absoluteEventRepository.findBy({user_id: userId});
    }

    async getUserEventById(eventId: number){
        return this.absoluteEventRepository.findOneBy({id: eventId});
    }

    async editEvent(absoluteEvent: AbsoluteEventEntity){
        const event = await this.absoluteEventRepository.findOneBy({id: absoluteEvent.id});
        event.name = absoluteEvent.name;
        event.priority = absoluteEvent.priority;
        event.flexible = absoluteEvent.flexible;
        event.start_date = absoluteEvent.start_date;
        event.end_date = absoluteEvent.end_date;
        event.whole_day = absoluteEvent.whole_day;
        event.start_time = absoluteEvent.start_time;
        event.end_time = absoluteEvent.end_time;
        event.repeat = absoluteEvent.repeat;
        event.repeat_type = absoluteEvent.repeat_type;
        event.repeat_interval = absoluteEvent.repeat_interval;
        event.location = absoluteEvent.location;
        event.category = absoluteEvent.category;
        event.description = absoluteEvent.description;
        event.alarms = absoluteEvent.alarms;

        return this.absoluteEventRepository.save(event);
    }

    async deleteEvent(eventId: number){
        return this.absoluteEventRepository.delete({id: eventId});
    }

    async getEvents(){
        return this.absoluteEventRepository.find();
    }

    async getEventByDate(date: Date){
        return this.absoluteEventRepository.findBy({start_date: date});
    }

    async getEventsByDateRange(userId: number,from: Date, to: Date) {
        if(from.getDay() == to.getDay() && from.getMonth() == to.getMonth() && from.getFullYear() == to.getFullYear()) {
            return this.absoluteEventRepository.find({
                where: {
                    user_id: userId,
                    start_date: from
                }
            });
        } else {
            return this.absoluteEventRepository.find({
                where: {
                    user_id: userId,
                    start_date: MoreThanOrEqual(from),
                    end_date: LessThanOrEqual(to)
                }
            });
        }
    }

    async getEventByCategory(category: EventCategoryEnum){
        return this.absoluteEventRepository.findBy({category: category});
    }
}
