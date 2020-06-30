# Kiosk Realm

This is a PoC to recreate Homepass's kiosk check in experience using React Native, Realm and MongoDB.

The end goal is to create an alternative offline kiosk check in experience to understand the possibility of what MongoDB / Realm can offer

## Presentation

[Google Slides](https://docs.google.com/presentation/d/16aM2NUlPtI3Qk4Hi8bU1nYvcYYGrlrXfx5GweYEYBBM/edit?usp=sharing)

## Discoveries

- In order to use Realm Sync, your Atlas cluster must use MongoDB version 4.4
- MongoDB version 4.4 beta is currently not available in Australia region (therefore this project is based in N. America region / N. Virginia)
- Every request sent to Realm must come from an authenticated user, so we need to have a way for users to create accounts and log in.
- GraphQL functionality from Realm isn't intended for mobile application
- Every change done on the Realm Portal requires a 'deploy'. Unsure if this can be codified to be included as part of our deploy script
- Realm Portal is where you ....
- Schema matching is CRUCIAL. Can cause app to crash when attempting to open 'realm'
- Each time schema changes, your realm app version on the app must be manually updated. Otherwise the app will crash when it attempts to sync as your property/types has changed
- You can install external npm packages to Realm Functions
- Realm Functions supports MOST but not all built-in Node modules
- synchronously opening realm vs asynchronously opening realm

## Find out more about

- Choose a Partition Key: Enter \_partition for the partition key. The partition key specifies which realm each object belongs to.
- Partition keys allow you to split data from your MongoDB collections into Realms for simpler access within your application and definition of permissions. The field you choose as your partition key must exist in the JSON schema of any collection you wish to sync.
- getRealmApp.js parameters?
