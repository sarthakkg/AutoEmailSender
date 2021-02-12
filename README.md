# AutoEmailSender

AutoEmailSender is a Google Apps Script (based on JavaScript) for sending weekly newsletters/update emails to subscribers and not to unsubscribers.

Allows you to send upto 10,000 emails per day for free without paying for expensive email newsletter software.

## Usage Steps
1. Set up a free Google account or paid GSuite account on a private domain.
2. Create a new Google Sheet in [Google Drive](https://drive.google.com).
3. In the first sheet, create a column of subscribers with their email.
4. In the second sheet, create a column of unsubscribers with their email.
5. Hover over Tools, and click on Script Editor.
6. Copy paste the desired .gs file from this repo into the Script Editor.
7. Run as desired.

## Optional Functionality with Google Forms
#### Used to Automate Subscriber List and Unsubscribed List
1. Create a new Google Form at [Google Drive](https://drive.google.com).
2. Click Settings logo in the top-right corner.
3. Click "Collect email addresses".
4. Add in any other form fields as desired.
5. Use Google Form link/embed to allow members to signup for your newsletter.
6. Click on Responses on the Google Form -> the tree dots -> "Select response destination".
7. Associate the existing Subscribers sheet with the Google Form to allow new members to be automatically added.
8. Replicate above steps if you want to manage another Unsubscribers list.

## Types of Email Functionality

1. HTML_send.gs coverts an HTML file (with CSS) to send in an email.
2. GoogleDoc_send.gs converts a Google Doc to send in an email.
   It also personalizes each email with the name retrieved from the Google Sheet into the Google Doc at this location: {{Name}}.
3. GoogleForm_send.gs sends an email as soon as a new entry is added from a Google Form submission.
   If Optional Functionality with Google Form (as shown above) is integrated, you can trigger an email to be automatically send whenever a user submits the form. It also personalizes based on name.
