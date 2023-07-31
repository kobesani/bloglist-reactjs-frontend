const userStorageKey = "loggedBloglistAppUser"

const userToLocalStorage = (userToStore) =>
  window
    .localStorage
    .setItem(
      userStorageKey, JSON.stringify(userToStore)
    );

const userFromLocalStorage = () => 
  window
    .localStorage
    .getItem(userStorageKey);

const userRemoveLocalStorage = () =>
  window
    .localStorage
    .removeItem(userStorageKey);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  userToLocalStorage,
  userFromLocalStorage,
  userRemoveLocalStorage
}
