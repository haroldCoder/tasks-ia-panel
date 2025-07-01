"use server"
import { google } from "googleapis"
import { GoogleCalendar } from '../../interfaces/googleCalendar';
import { clerkClient } from "@clerk/nextjs/server";

export const addEventToCalendar = async (id_userclerk: string, email: string, calendar_data: GoogleCalendar): Promise<boolean> => {
  const oAuthResponse = await (await clerkClient()).users.getUserOauthAccessToken(id_userclerk, "oauth_google");
    
    if (!oAuthResponse.data || oAuthResponse.data.length === 0) {
      console.error("No Google OAuth token found for user:", id_userclerk);
      return false;
    }

    const accessToken = oAuthResponse.data[0].token;

    const client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URI
    );
    client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth: client });

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