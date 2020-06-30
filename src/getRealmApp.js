import Realm from 'realm';

let app;

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {
    const appId = 'kioskrealm-xxxxx';

    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: 'kiosk',
        version: '1.1',
      },
    };
    app = new Realm.App(appConfig);
  }
  return app;
}
