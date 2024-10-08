import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';
import {EventPriorityEnum} from "../enum/event-priority.enum";
import {RepeatTypeEnum} from "../enum/repeat-type.enum";
import {EventCategoryEnum} from "../enum/event-category.enum";
import {EventAlarm} from "../classes/event-alarm";

@Entity('absolute-events')
export class AbsoluteEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    priority: EventPriorityEnum;

    @Column()
    flexible: boolean = false;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    whole_day: boolean;

    @Column()
    start_time: Date;

    @Column()
    end_time: Date;

    @Column()
    repeat: boolean = false;

    @Column({nullable:true})
    repeat_type: RepeatTypeEnum;

    @Column({nullable:true})
    repeat_interval: number;

    @Column({nullable:true})
    location: string;

    @Column( {nullable:true})
    category: EventCategoryEnum;

    @Column({nullable:true})
    description: string;

    @Column({type: "json",nullable:true})
    alarms: EventAlarm[];

    @Column({nullable:true})
    flexible_event_id: number;
}
