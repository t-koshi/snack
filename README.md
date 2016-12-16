# snack

[snack live](http://snackss.herokuapp.com/)

## Features & Implementation

snack is a web application inspired by Slack. It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Redux architectural framework on the frontend.

### Live chat

Messages are stored at the database level with associated to an `author_id` and `channel_id`. Realtime updating is accomplished using Pusher. A single instance of Pusher is constructed on each visit to the message feed component. Based on the data returned by the Pusher event, the channel's page is updated.

### Channels

Messages are organized by their parent Channels. All users can freely create channels. Channels can be private or public. All users can browse, search for, and join any public channel. Private channels do not appear when browsing or searching, and memberships to private channels are by invite only.

### Direct messages

Direct messages can only be seen by a specified group of members. The number of members per channel is limited to 7 users. All users can be searched for and added to a direct message.

### Single page

Sloth is a single page app that allows for quick navigation between its various components. As data is fetched from Rails, components are only updated when necessary.

## Future Directions for the Project

The future of snack will include:

### Search

Searching for specific messages by content, channel, or author.

### Emoji Reactions

Slack allows users to leave reactions to individual messages. Channel creators can create custom emojis.

### Mailer

Slack sends confirmation emails to users that sign up for its site. I would also set up a mailer for password retrieval.
