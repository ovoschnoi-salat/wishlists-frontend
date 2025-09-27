import { useState, type FC } from "react";
import { Icon28Plus } from "@/icons/28/Plus.tsx";
import {
  Section,
  List,
  Button,
  Input,
  Textarea,
} from "@telegram-apps/telegram-ui";
import {
  initialNewWishlistItemFormState,
  NewWishlistItemProps,
  WishlistItemLink,
} from "./model";

export const NewWishlistItem: FC<NewWishlistItemProps> = ({ onSave }) => {
  // Всю логику можно вынести в отдельный хук, useWishlist, где будут метоты обновления, удаления и т.п.
  // Представление оставить тут
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [links, setLinks] = useState<WishlistItemLink[]>(
    initialNewWishlistItemFormState
  );

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    targetFieldGroupId: number,
    field: "title" | "url"
  ) => {
    const value = event.target.value;

    setLinks((prevState) =>
      prevState.map((link) =>
        link.fieldGroupId === targetFieldGroupId
          ? { ...link, [field]: value }
          : link
      )
    );
  };

  const removeLink = (targetFieldGroupId: number) => {
    setLinks((prevState) =>
      prevState.filter((link) => link.fieldGroupId !== targetFieldGroupId)
    );
  };

  const isFormValid = () => {
    return (
      title.trim() && links.some((link) => link.title.trim() || link.url.trim())
    );
  };

  const handleSubmit = () => {
    if (links.length || title.trim()) {
      setIsSaving(true);
      onSave!({
        title: "string",
        description: "string",
        price: "string",
        links: [] as WishlistItemLink[],
        reservable: true,
      });

      // TODO
      // onSave?.({
      //   title: title.trim(),
      //   description: description.trim(),
      //   isPrivate,
      //   usersWithAccess,
      // });
    }
  };

  return (
    <List>
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
            onChange={(e) => handleInputChange(e, link.fieldGroupId, "title")}
          />
          <Textarea
            name={"linkUrl" + link.fieldGroupId}
            header={"Url"}
            value={link.url}
            placeholder="https://example-link.com/"
            onChange={(e) => handleInputChange(e, link.fieldGroupId, "url")}
          />
        </Section>
      ))}

      <Section>
        <Button mode="outline" onClick={handleAddLink}>
          Add link
        </Button>
      </Section>

      {/* Privacy Settings Section */}
      <Section header="Privacy settings">
        {/* Private List Toggle */}
        {/*<Cell*/}
        {/*  after={*/}
        {/*    <Switch*/}
        {/*      checked={isPrivate}*/}
        {/*      onChange={(event) => setIsPrivate(event.target.checked)}*/}
        {/*    />*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Text>Private list</Text>*/}
        {/*</Cell>*/}

        {/* Users with Access */}
        {/*{*/}
        {/*  isPrivate ?*/}
        {/*    (*/}
        {/*      <>*/}
        {/*        <Cell*/}
        {/*          after={*/}
        {/*            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>*/}
        {/*              <Text>{usersWithAccess}</Text>*/}
        {/*              <Navigation/>*/}
        {/*            </div>*/}
        {/*          }*/}
        {/*          onClick={handleUsersWithAccessPress}*/}
        {/*        >*/}
        {/*          <Text>Users with access</Text>*/}
        {/*        </Cell>*/}
        {/*      </>*/}
        {/*    ) : (<></>)*/}
        {/*}*/}
      </Section>

      {/* Create List Button */}
      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
          onClick={handleSubmit}
          disabled={!isFormValid || isSaving}
          loading={isSaving}
          before={<Icon28Plus />}
        >
          Create list
        </Button>
      </Section>
    </List>
  );
};
