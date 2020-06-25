import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Checkin} from './schemas';

const CheckinsContext = React.createContext(null);

const CheckinsProvider = ({children, spaceId}) => {
  const {user} = useAuth();
  const [checkins, setCheckins] = useState([]);
  const realmRef = useRef(null);

  useEffect(() => {
    if (user == null) {
      console.warn('User must be authenticated!');
      return;
    }

    const config = {
      schema: [Checkin.schema],
      sync: {
        user,
        partitionValue: spaceId,
      },
    };

    console.log(
      `Attempting to open Realm ${spaceId} for user ${
        user.identity
      } with config: ${JSON.stringify(config)}...`,
    );

    // Set this flag to true if the cleanup handler runs before the realm open
    // success handler, e.g. because the component unmounted.
    let canceled = false;

    Realm.open(config)
      .then(openedRealm => {
        console.log('Realm opened');
        if (canceled) {
          openedRealm.close();
          return;
        }

        realmRef.current = openedRealm;

        const syncCheckins = openedRealm.objects('Checkin');

        openedRealm.addListener('change', () => {
          setCheckins([...syncCheckins]);
        });

        // Set the tasks state variable and re-render.
        setCheckins([...syncCheckins]);
      })
      .catch(error => console.warn('Failed to open realm:', error));

    return () => {
      canceled = true;

      const realm = realmRef.current;
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user, spaceId]);

  const createCheckin = ({name, mobile, email}) => {
    const realm = realmRef.current;

    realm.write(() => {
      console.log('creating checkin entry....');
      realm.create(
        'Checkin',
        new Checkin({
          partition: spaceId,
          name,
          mobile,
          email,
        }),
      );
    });
  };

  return (
    <CheckinsContext.Provider
      value={{
        createCheckin,
        checkins,
        spaceId,
      }}>
      {children}
    </CheckinsContext.Provider>
  );
};

const useCheckins = () => {
  const checkins = useContext(CheckinsContext);
  if (checkins == null) {
    throw new Error('useTasks() called outside of a TasksProvider?');
  }
  return checkins;
};

export {CheckinsProvider, useCheckins};
