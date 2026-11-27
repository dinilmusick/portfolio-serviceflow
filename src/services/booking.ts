import { createService, createServiceDefinition, type IService } from '@ultrst-armada/krnl';
import type { ServiceFacade } from '@ultrst-armada/kloks';

export type BookingStatus='confirmed'|'pending';
export type Booking={id:string;customer:string;service:string;date:string;status:BookingStatus;amount:number};

export interface BookingState extends Record<string, unknown> {
  bookings: Booking[];
}

export interface CreateBookingInput {
  customer: string;
  service: string;
  date: string;
  amount: number;
}

const initialBookings:Booking[]=[
{id:'BK-1042',customer:'Aisha Khan',service:'Strategy Session',date:'Today · 14:00',status:'confirmed',amount:240},
{id:'BK-1041',customer:'Maya Patel',service:'Website Sprint',date:'Today · 16:30',status:'confirmed',amount:680},
{id:'BK-1040',customer:'Daniel Wong',service:'Brand Audit',date:'Tomorrow · 09:30',status:'pending',amount:310}
];

let instanceRef: IService<BookingState>;
let nextBookingNumber = 1043;

export const bookingDefinition = createServiceDefinition<BookingState>({
  id:'serviceflow.booking',
  name:'ServiceFlow Booking',
  version:'0.1.0',
  state:{initial:{bookings:[...initialBookings]}},
  operations:{
    list:{
      id:'serviceflow.booking.list',
      name:'list',
      description:'Return every booking in the ledger.',
      handler:async()=>[...instanceRef.getState().bookings]
    },
    create:{
      id:'serviceflow.booking.create',
      name:'create',
      description:'Create a confirmed booking and prepend it to the ledger.',
      handler:async(input?:CreateBookingInput)=>{
        const data=input as CreateBookingInput;
        const booking:Booking={...data,id:'BK-'+(nextBookingNumber++),status:'confirmed'};
        instanceRef.setState({bookings:[booking,...instanceRef.getState().bookings]});
        return booking;
      }
    },
    reset:{
      id:'serviceflow.booking.reset',
      name:'reset',
      description:'Restore the seeded demo bookings.',
      handler:async()=>{
        instanceRef.setState({bookings:[...initialBookings]});
        return [...instanceRef.getState().bookings];
      }
    }
  }
});

export function createBookingService():IService<BookingState>{
  const instance=createService(bookingDefinition);
  instanceRef=instance;
  return instance;
}

const defaultBookingInstance=createBookingService();

export const bookingService:ServiceFacade<BookingState>={
  id:bookingDefinition.id,
  name:bookingDefinition.name,
  version:bookingDefinition.version,
  runtime:'client',
  deployment:'local',
  definition:bookingDefinition,
  get telemetry(){return defaultBookingInstance.telemetry;},
  createInstance:createBookingService,
  async execute<TIn = unknown, TOut = unknown>(operation:string,input?:TIn):Promise<TOut>{
    await defaultBookingInstance.start();
    return defaultBookingInstance.call<TIn,TOut>(operation,input);
  }
};

export function calculateRevenue(items:Booking[]){return items.reduce((sum,item)=>sum+item.amount,0);}
export function calculateConfirmationRate(items:Booking[]){return items.length===0?0:Math.round((items.filter(item=>item.status==='confirmed').length/items.length)*100);}
