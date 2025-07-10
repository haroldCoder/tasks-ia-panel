"use server"
import { calendar_v3, google } from "googleapis"
import { GoogleCalendar } from '../../interfaces/googleCalendar';
import { googleAuth } from "../services/googleAuth";
import { PatchGoogleCalendar } from "../../interfaces/patchGoogleCalendar";

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

export const getEventsFromCalendar = async (id_userclerk: string): Promise<calendar_v3.Schema$Event[] | undefined> => {
  try {
    const client = await googleAuth(id_userclerk);

    const calendar = google.calendar({ version: 'v3', auth: client });

    const calendarResponse = await calendar.events.list({
      calendarId: 'primary',
    });

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

export const deleteEventRequest = async (id_clerk: string, event_id: string): Promise<boolean> => {
  try {
    if (!event_id) {
      return false;
    }
    const client = await googleAuth(id_clerk);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const calendarResponse = await calendar.events.delete({
      calendarId: 'primary',
      eventId: event_id,
    });
    return true;
  } catch (error: any) {
    if (error.code === 404) {
      return false;
    }
    return false;
  }

}

export const patchEvent = async(id_clerk: string, event_id: string, data: PatchGoogleCalendar) =>{
  try{
    if (!event_id) {
      return false;
    }

    const client = await googleAuth(id_clerk);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const calendarResponse = await calendar.events.patch({
      calendarId: 'primary',
      eventId: event_id,
      requestBody: {
        status: data.status,
        summary: data.summary,
        description: data.description,
        start: {
          dateTime: data.start
        },
        end: {
          dateTime: data.end
        },
        attendees: data.email?.map((email)=>({email: email}))
      }
    })

    return true

  }
  catch(err: any){
    if (err.code === 404) {
      return false;
    }
    return false;
  }
}

export const getEventCalendar = async (id_userclerk: string, event_id: string): Promise<calendar_v3.Schema$Event> => {
  try {
    if (!event_id) {
      throw new Error("EventId is required")
    }

    const client = await googleAuth(id_userclerk);
    const calendar = google.calendar({ version: 'v3', auth: client });

    const calendarResponse = await calendar.events.get({
      calendarId: 'primary',
      eventId: event_id,
    });

    return calendarResponse.data
  } catch (error: any) {
    console.log(error);
    
    throw new Error(error)
  }
}