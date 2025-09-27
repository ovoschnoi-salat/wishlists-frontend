export interface WishlistItemLink {
  fieldGroupId: number;
  title: string;
  url: string;
}

export interface NewWishlistItemProps {
  onSave?: (wishlistItem: {
    title: string;
    description: string;
    price: string;
    links: WishlistItemLink[];
    reservable: boolean;
  }) => void;
}

export const initialNewWishlistItemFormState = [
  {
    fieldGroupId: 1,
    title: "",
    url: "",
  },
];
