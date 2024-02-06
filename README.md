- This repository contains different inbox's using suprsend inbox headless sdk [@suprsend/react-inbox](https://docs.suprsend.com/docs/headless-inbox) which is extremely customisable. You can use this code to build inbox in your project and customise this code according to your requirement and styles.

- You can use [SuprSendInbox](https://docs.suprsend.com/docs/inbox-react) component in same SDK which comes with internal Inbox UI If you want basic customisations like css or pass few custom components.

### Inbox Types present in this project:

- PopUp Inbox
- Side Sheet Inbox
- Full Screen Inbox

  You can uncomment type of inbox you want to use, in `App.jsx`. Changing theme option is also available, you can set `Themes.DARK` in theme state in `App.jsx`.

### Running Locally

1. Clone repo
2. Make sure you have node version 18+ as its needed to run this vite project
3. npm install
4. npm run dev
5. Replace `SuprSendProvider` props with your valid values in App.jsx.
