import {
  Cell, Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceWishlist} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceWishlistItem type from backend-client
export type Wishlist = ServiceWishlist;

interface WishlistsProps {
  wishlists: Wishlist[];
  isLoading: boolean;
  onWishlistClick: (wishlistId: number) => void;
}

export const Wishlists: FC<WishlistsProps> = ({wishlists, isLoading, onWishlistClick}) => {
  if (isLoading) {
    return <Loading/>;
  }

  return wishlists.map((wishlist) =>
      <Cell
        key={wishlist.id}
        after={<Navigation/>}
        subtitle={wishlist.is_private ? `Private` : undefined}
        onClick={() => onWishlistClick(wishlist.id!)}
      >
        {wishlist.title}
      </Cell>
    )
};
// wishlists.map is not a function
//
// TypeError: wishlists.map is not a function
//     at Wishlists (http://localhost:5173/src/components/Wishlists/Wishlists.tsx:31:22)
//     at renderWithHooks (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:11596:26)
//     at mountIndeterminateComponent (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:14974:21)
//     at beginWork (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:15962:22)
//     at beginWork$1 (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:19806:22)
//     at performUnitOfWork (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:19251:20)
//     at workLoopSync (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:19190:13)
//     at renderRootSync (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:19169:15)
//     at recoverFromConcurrentError (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:18786:28)
//     at performConcurrentWorkOnRoot (http://localhost:5173/node_modules/.vite/deps/chunk-NGP3Y3H7.js?v=ec26e8d3:18734:30)