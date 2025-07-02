import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis"

export const googleAuth = async(id_userclerk: string) : Promise<any> =>{
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

    return client;
}