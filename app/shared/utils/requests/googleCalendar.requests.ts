"use server"
import { google } from "googleapis"
import { GoogleCalendar } from '../../interfaces/googleCalendar';
import { googleAuth } from "../services/googleAuth";

export const addEventToCalendar = async (id_userclerk: string, email: string, calendar_data: GoogleCalendar): Promise<boolean> => {
  const client = await googleAuth(id_userclerk);

  const calendar = google.calendar({ version: 'v3', auth: client });

  const event = {
    summary: calendar_data.summary,
    description: calendar_data.description,
    start: { dateTime: calendar_data.start },
    end: { dateTime: calendar_data.end },
    attendees: calendar_data.email ? calendar_data.email.map((email) => ({ email: email })) : [{ email }],
    id: `task${calendar_data.id.toString()}`
  };

  const calendarResponse = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });

  const created = await calendarResponse.ok;

  if (created) {
    return true
  }
  return false
}

export const getEventsFromCalendar = async (id_userclerk: string): Promise<any> => {
  try {
    const client = await googleAuth(id_userclerk);

    const calendar = google.calendar({ version: 'v3', auth: client });

    const calendarResponse = await calendar.events.list({
      calendarId: 'primary',
    });

    console.log(calendarResponse.data.items);

    return calendarResponse.data.items;
  } catch (error) {
    console.log(error);
  }
}

export const searchEventFromCalendar = async (id_userclerk: string, event_id: string): Promise<boolean> => {
  try {
    if (!event_id) {
      return false;
    }

    const client = await googleAuth(id_userclerk);
    const calendar = google.calendar({ version: 'v3', auth: client });

    const calendarResponse = await calendar.events.get({
      calendarId: 'primary',
      eventId: event_id,
    });

    if (calendarResponse.data && calendarResponse.data.status !== "cancelled") {
      return true;
    }

    return false;
  } catch (error: any) {
    if (error.code === 404) {
      return false;
    }
    return false;
  }
}