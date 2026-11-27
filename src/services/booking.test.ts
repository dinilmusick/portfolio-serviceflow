import { describe, expect, it, beforeEach } from 'vitest';
import { bookingService, calculateConfirmationRate, calculateRevenue, type Booking } from './booking';
describe('ServiceFlow booking domain',()=>{
 beforeEach(async()=>{await bookingService.execute('reset')});
 it('calculates revenue from current bookings',async()=>{const items=await bookingService.execute('list');expect(calculateRevenue(items as Booking[])).toBe(1230)});
 it('calculates confirmed booking rate',async()=>{const items=await bookingService.execute('list') as Array<{status:string}>;expect(calculateConfirmationRate(items as never[])).toBe(67)});
 it('creates a booking through the service boundary',async()=>{const created=await bookingService.execute('create',{customer:'Test Client',service:'Website Sprint',date:'Friday · 11:00',amount:680});expect(created).toMatchObject({customer:'Test Client',service:'Website Sprint',amount:680,status:'confirmed'});const items=await bookingService.execute('list') as unknown[];expect(items).toHaveLength(4)});
});