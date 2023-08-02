const userStorageKey = "loggedBloglistAppUser";

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

export default {
  userToLocalStorage,
  userFromLocalStorage,
  userRemoveLocalStorage
};
