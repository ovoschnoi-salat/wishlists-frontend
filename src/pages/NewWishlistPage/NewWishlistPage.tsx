import {
  List,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {NewWishlist} from '@/components/NewWishlist/NewWishlist.tsx';
import {postUserWishlist} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useNavigate} from "react-router-dom";

export const NewWishlistPage: FC = () => {
  const navigate = useNavigate()

  const handleSaveNewWishlist = async (newWishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => {
    const {data, error} = await postUserWishlist({
      body: {
        title: newWishlist.title,
        description: newWishlist.description,
        is_private: newWishlist.isPrivate,
      }
    });

    if (error) {
      throw error
    }

    navigate(`/wishlist/${data?.id!}`)
  };



  return (
    <Page>
      <List>
        <NewWishlist
          onSave={handleSaveNewWishlist}
        />
      </List>
    </Page>
  );
};
