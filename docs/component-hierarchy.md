## Component Hierarchy

**AuthFormContainer**
- AuthForm

**ChannelsIndexContainer**
- ChannelIndex
  + ChannelFormContainer**
    * ChannelForm
  + ChannelIndexItemContainer
    * ChannelIndexItem
      * MessagesIndexContainer
        * MessagesIndex
          * MessageIndexItem

**ProfileContainer**
- Profile

## Routes

|    Path    |      Component      |
|------------|---------------------|
| "/" | "Root" |
| "/sign-up" | "SessionFormContainer" |
| "/sign-in" | "SessionFormContainer" |
| "/messages/:channelName/" | "MessagesIndex" |
| "/channels" | "ChannelIndexItemContainer" |
 "/channels/new" | "ChannelFormContainer" |
