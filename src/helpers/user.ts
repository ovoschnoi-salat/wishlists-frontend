import {ServiceFriend} from "@/backend-client";

export const getFriendUsernameOrId = (user: ServiceFriend) => {
  return user.username ? "@" + user.username : user.id!.toString();
}