import {Router, Response, Request} from 'express';
import prisma from '../prisma/database';
import dayjs from 'dayjs';

const router = Router();

interface AppointmentRequest extends Request {
  query: {
    date: string;
  };
}

router.get('/', async (request: AppointmentRequest, response: Response) => {
  const slots = [
    {time: '08:00'},
    {time: '09:00'},
    {time: '10:00'},
    {time: '11:00'},
    {time: '12:00'},
    {time: '13:00'},
    {time: '14:00'},
    {time: '15:00'},
    {time: '16:00'},
    {time: '17:00'}
  ];

  const startOfDay = dayjs(request.query.date).startOf('day').toDate();
  const endOfDay = dayjs(startOfDay).endOf('day').toDate();

  const appointments = await prisma.appointment.findMany({
    where: {
      time: {
        gte: startOfDay,
        lt: endOfDay
      },
      isBooked: true
    }
  });

  const availability = slots.map(slot => {
    const appointmentTime = dayjs(`${request.query.date}T${slot.time}:00`).toDate();
    const isBooked = appointments.some(
      appointment => appointment.time.getTime() === appointmentTime.getTime()
    );

    return {...slot, isBooked};
  });

  response.send(availability);
});

export default router;
