import {useState, type FC, useCallback} from "react";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {
  Section,
  Button,
  Input,
  Textarea, Cell, Switch, ButtonCell, List,
} from "@telegram-apps/telegram-ui";

import {ServiceCreateWishlistItemRequest, ServiceWishlistItem, ServiceWishlistItemLink} from "@/backend-client";
import {Icon28Cancel} from "@/icons/28/Cancel.tsx";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";

export interface WishlistItemLink {
  fieldGroupId: number;
  title: string;
  url: string;
}

export interface NewWishlistItemProps {
  wishlist: ServiceWishlistItem;
  onSave: (wishlistItem: ServiceCreateWishlistItemRequest) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export const EditWishlistItem: FC<NewWishlistItemProps> = ({wishlist, onSave, onDelete}) => {
  const {t} = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(wishlist.title!);
  const [description, setDescription] = useState(wishlist.description!);
  const [price, setPrice] = useState(wishlist.price!)
  const [links, setLinks] = useState<WishlistItemLink[]>(wishlist.links ? wishlist.links.map((value, index) => {
    return {
      fieldGroupId: index,
      title: value.title,
      url: value.url,
    } as WishlistItemLink
  }) : []);
  const [isReservable, setIsReservable] = useState(wishlist.reservable!)

  const handleAddLink = () => {
    setLinks((prevState) => [
      ...prevState,
      {
        fieldGroupId:
          prevState.length > 0
            ? Math.max(...prevState.map((l) => l.fieldGroupId)) + 1
            : 1,
        title: "",
        url: "",
      },
    ]);
  };

  const handleInputChange = (
    value: string,
    targetFieldGroupId: number,
    field: "title" | "url"
  ) => {

    setLinks((prevState) =>
      prevState.map((link) =>
        link.fieldGroupId === targetFieldGroupId
          ? {...link, [field]: value}
          : link
      )
    );
  };

  const removeLink = (targetFieldGroupId: number) => {
    setLinks((prevState) =>
      prevState.filter((link) => link.fieldGroupId !== targetFieldGroupId)
    );
  };

  const isFormValid = useCallback(() => {
    return (
      title.trim().length > 0 && !links.some((link) => !link.url.trim())
    );
  }, [links, title]);

  const handleSubmit = async () => {
    if (isFormValid()) {
      setIsSaving(true);
      await onSave({
        title: title,
        description: description,
        price: price,
        links: links.map((link) => {
          return {
            title: link.title,
            url: link.url,
          } as ServiceWishlistItemLink
        }),
        reservable: isReservable,
      });

      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) {
      return
    }
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      {/* Title Section */}
      <Section header={t('wish.title')}>
        <Input
          disabled={isDeleting || isSaving}
          placeholder={t('wish.title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Section>

    {/* Description Section */}
      <Section header={t('wish.description')}>
        <Textarea
          disabled={isDeleting || isSaving}
          placeholder={t('wish.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </Section>

    {/* Price Section */}
      <Section header={t('wish.price')}>
        <Input
          disabled={isDeleting || isSaving}
          placeholder={t('wish.price')}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Section>

      <Section
        header={t('wish.links')}
      >
        {links.map((link) => (
          <List key={"link-list-" + link.fieldGroupId}>
            <div className="px-6 flex items-center justify-between">
              {t('wish.link')}
              <Button
                disabled={isDeleting || isSaving}
                mode="plain"
                onClick={() => removeLink(link.fieldGroupId)}
              >
                {t('wish.removeLink')}
              </Button>
            </div>
            <Input
              key={"link-title" + link.fieldGroupId}
              disabled={isDeleting || isSaving}
              name={"linkTitle" + link.fieldGroupId}
              header={t('wish.linkTitle')}
              value={link.title}
              placeholder={t('wish.linkTitle')}
              onChange={(e) => handleInputChange(e.target.value, link.fieldGroupId, "title")}
            />
            <Textarea
              key={"link-url" + link.fieldGroupId}
              disabled={isDeleting || isSaving}
              name={"linkUrl" + link.fieldGroupId}
              header="URL"
              value={link.url}
              placeholder="https://example-link.com/"
              onChange={(e) => handleInputChange(e.target.value, link.fieldGroupId, "url")}
            />
          </List>
        ))}

        <ButtonCell before={<Icon28Plus/>} disabled={isDeleting || isSaving} onClick={handleAddLink}>
          {t('wish.addLink')}
        </ButtonCell>
      </Section>

      {/* Privacy Settings Section */}
      <Section header={t('wish.reservationSettings')}>
        <Cell
          after={
            <Switch
              disabled={isDeleting || isSaving}
              checked={isReservable}
              onChange={(event) => setIsReservable(event.target.checked)}
            />
          }
        >
          {t('wish.reservable')}
        </Cell>
      </Section>

      <Section>
        <StretchedButton
          mode="filled"
          size="m"
          stretched
          onClick={handleSubmit}
          disabled={!isFormValid() || isSaving || isDeleting}
          loading={isSaving}
        >
          {t('wish.save')}
        </StretchedButton>
      </Section>

      {onDelete &&
       <Section>
         <ButtonCell
          disabled={isDeleting || isSaving}
          mode={"destructive"}
          before={<Icon28Cancel/>}
          onClick={handleDelete}
         >
           {t('wish.remove')}
         </ButtonCell>
       </Section>
      }
    </>
  )
    ;
};
