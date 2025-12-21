import {useState, type FC, useCallback} from "react";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {
  Section,
  Button,
  Input,
  Textarea, Cell, Switch, ButtonCell,
} from "@telegram-apps/telegram-ui";

import {ServiceCreateWishlistItemRequest, ServiceWishlistItem, ServiceWishlistItemLink} from "@/backend-client";

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
      <Section header="Title">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Section>

      {/* Description Section */}
      <Section header="Description">
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </Section>

      {/* Price Section */}
      <Section header="Price">
        <Input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Section>

      {links.map((link) => (
        <Section
          key={link.fieldGroupId}
          header={
            <Section.Header>
              {"Link"}
              <Button
                mode="plain"
                onClick={() => removeLink(link.fieldGroupId)}
              >
                Remove
              </Button>
            </Section.Header>
          }
        >
          <Input
            name={"linkTitle" + link.fieldGroupId}
            header={"Title"}
            value={link.title}
            placeholder="Link title"
            onChange={(e) => handleInputChange(e.target.value, link.fieldGroupId, "title")}
          />
          <Textarea
            name={"linkUrl" + link.fieldGroupId}
            header={"Url"}
            value={link.url}
            placeholder="https://example-link.com/"
            onChange={(e) => handleInputChange(e.target.value, link.fieldGroupId, "url")}
          />
        </Section>
      ))}

      <Section>
        <Button onClick={handleAddLink}>
          Add link
        </Button>
      </Section>

      {/* Privacy Settings Section */}
      <Section header="Reservation settings">
        <Cell
          after={
            <Switch
              checked={isReservable}
              onChange={(event) => setIsReservable(event.target.checked)}
            />
          }
        >
          Reservable
        </Cell>
      </Section>

      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
          onClick={handleSubmit}
          disabled={!isFormValid() || isSaving}
          loading={isSaving}
          before={<Icon28Plus/>}
        >
          Save wish
        </Button>
      </Section>
      {onDelete && <Section>
        <ButtonCell
          disabled={isDeleting || isSaving}
          mode={"destructive"}
          onClick={handleDelete}
        >
          Delete Wish
        </ButtonCell>
      </Section>}
    </>
  );
};
