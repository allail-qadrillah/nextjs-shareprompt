import * as Realm from "realm-web"

export const connectToRealm = async () => {

  const app = new Realm.App({ id: 'promptopia-ayvgj' });
  const credentials = Realm.Credentials.anonymous();

  try {
    const user = await app.logIn(credentials);
    console.log(user)

    const searchPrompts = await user.functions.searchPrompt("test")
    searchPrompts()
    console.log(searchPrompts)
  } catch (err) {
    console.error("Failed to log in", err);
  }
}