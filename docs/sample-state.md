{
  session: {
    currentUser: {
      id: 1,
      username: "heek",
      icon_url: "assets/users/heek.png"
      }
    },
    errors: []
  },
  currentChannel: {
    id: 1,
    name: "# general"
  },
  messages: {
    1: {
      channel_id: 1,
      author_id: 1,
      body: "yum",
      edited: false,
    },
    2: {
      channel_id: 2,
      author_id: 2,
      body: ':d',
      edited: false,
    },
    3: {
      channel_id: 3,
      author_id: 1,
      body: 'delicious',
      edited: true,
    }
  },
  channels: {
    1: {
      name: '# general',
      purpose: 'to talk about snacks',
      creator_id: 1,
      members: [
        {id: 1,
          username: 'heek',
          icon_url: "assets/users/heek.png"
        },
        {id: 2,
          username: 'mochicat',
          icon_url: "assets/users/mochicat.png"
        },
      ],
    },
    2: {
      name: 'mochicat',
      purpose: 'to talk to mochicat',
      creator_id: 1,
      members: [
        {id: 1,
          username: 'heek',
          icon_url: "assets/users/heek.png"
        },
        {id: 2,
          username: 'mochicat',
          icon_url: "assets/users/mochicat.png"
        },
      ],
    }
  }
}
