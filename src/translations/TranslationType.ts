export interface TranslationType {
  wishlists: {
    wishlists: string;
    addWishlist: string;
    noWishlists: string;
    friendWishlists: string;
  };
  wishlist: {
    friendWishlist: string;
    title: string;
    private: string;
    description: string;
    editWishlist: string;
    shareWishlist: string;
    shareDescription: string;
    wishes: string;
    addWish: string;
    privacySettings: string;
    privateList: string;
    splitRequests: string;
    splitRequestsInvisibleToOwner: string;
    splitRequestsVisibleToOwner: string;
    accessList: string;
    save: string;
    remove: string;
    removeQuestion: string;
    noWishes: string;
    toast: {
      creating: string;
      created: string;
      editing: string;
      edited: string;
      removing: string;
      removed: string;
    };
  };
  wish: {
    title: string;
    about: string;
    description: string;
    price: string;
    links: string;
    link: string;
    linkTitle: string;
    removeLink: string;
    addLink: string;
    openLink: string;
    reservation: string;
    reservableText: string;
    reservationFreeText: string;
    edit: string;
    reservationSettings: string;
    reservable: string;
    save: string;
    remove: string;
    removeQuestion: string;
    loadingError: string;
    ownReservationText: string;
    reservedText: string;
    canBeReservedText: string;
    reserve: string;
    cancelReservation: string;
    splitRequestsTitle: string;
    splitRequestsDescription: string;
    splitRequestsInvisibleToOwnerDescription: string;
    splitRequestsVisibleToOwnerDescription: string;
    createSplitRequest: string;
    removeSplitRequest: string;
    toast: {
      creating: string;
      created: string;
      editing: string;
      edited: string;
      removing: string;
      removed: string;
      reserving: string;
      reserved: string;
      cancelingReservation: string;
      reservationCanceled: string;
      creatingSplitRequest: string;
      createdSplitRequest: string;
      removingSplitRequest: string;
      removedSplitRequest: string;
    };
  };
  friends: {
    requests: string;
    incomingRequests: string;
    add: string;
    sendRequest: string;
    myFriends: string;
    toast: {
      sendingRequest: string;
      requestSent: string;
      accepting: string;
      accepted: string;
      denying: string;
      denied: string;
    };
  }
  friend: {
    friend: string;
    name: string;
    username: string;
    usernameDescription: string;
    accept: string;
    deny: string;
    remove: string;
    removeQuestion: string;
    toast: {
      removing: string;
      removed: string;
    };
  };
  tabs: {
    myLists: string;
    friends: string;
    settings: string;
  };
  settings: {
    displayedName: string;
    displayedNameDescription: string;
    friendRequests: string;
    openToFriendRequests: string;
    language: string;
    save: string;
    toast: {
      saving: string;
      saved: string;
    };
  };
  yes: string;
  no: string;
  save: string;
  loading: string;
  invalidState: string;
  invalidStartParam: string;
}