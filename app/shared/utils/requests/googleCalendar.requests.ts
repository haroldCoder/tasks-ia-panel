"use server"
import { google } from "googleapis"
import { GoogleCalendar } from '../../interfaces/googleCalendar';

export const addEventToCalendar = async (accessToken: string, email: string, calendar_data: GoogleCalendar): Promise<boolean> => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: calendar_data.summary,
    description: calendar_data.description,
    start: { dateTime: calendar_data.start },
    end: { dateTime: calendar_data.end },
    attendees: calendar_data.email ? calendar_data.email.map((email) => ({ email: email })) : [{ email }],
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