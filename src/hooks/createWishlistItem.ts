// import {
//   getApiUserFriends,
//   ServiceCreateWishlistItemRequest,
//   ServiceFriend,
//   SubcodeErrorsResponse
// } from "@/backend-client";
// import {loadResult} from "@/hooks/loaderProps.ts";
// import {useEffect, useState} from "react";

// const createWishlistItem = (item: ServiceCreateWishlistItemRequest) => {
//   item.wishlist_id = wishlistItem.wishlist_id
//
//   const {data, error} = await patchApiUserWishlistItem({
//     body: item,
//     query: {
//       item_id: wishlistItem.id!,
//     }
//   })
//
//   if (error) {
//     setErrorSnackbarProps({
//       title: "error updating wish",
//       error: error,
//       onClose: () => {
//         setErrorSnackbarProps(undefined)
//       }
//     })
//     return
//   }
// }
//
//
// export const createWishlistItem = (item: ServiceCreateWishlistItemRequest): loadResult => {
//   const [responseData, setResponseData] = useState<ServiceFriend[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<SubcodeErrorsResponse | undefined>(undefined);
//
//   const fetch = async () => {
//     try {
//       setIsLoading(true);
//
//       const {data, error: responseError} = await getApiUserFriends({});
//
//       if (responseError) {
//         setResponseData([])
//         setError(responseError)
//         return
//       }
//
//       setResponseData(data);
//       setError(undefined)
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     fetch();
//   }, []);
//
//   return {
//     friends: responseData,
//     isLoading: isLoading,
//     error: error,
//     refetch: fetch,
//   };
// };
