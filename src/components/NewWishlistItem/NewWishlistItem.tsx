import {useState} from 'react';
import {
  Section,
  List,
  Button,
  Input,
  Textarea,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';


interface WishlistItemLink {
  title: string;
  url: string;
}

interface NewWishlistItemProps {
  onSave?: (wishlistItem: {
    title: string;
    description: string;
    price: string;
    links: WishlistItemLink[];
    reservable: boolean;
  }) => void;
}


export const NewWishlistItem: FC<NewWishlistItemProps> = ({onSave}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState([{
    id: 0,
    title: "",
    url: "",
  }]);
  const [isSaving, setIsSaving] = useState(false);
  let idCounter = 1

  const addLink = () => {
    setLinks([...links, {
      id: idCounter,
      title: "",
      url: "",
    }])
    idCounter++
  }

  const handleTitleChange = (i: number, title: string) => {
    const newLinks = links
    newLinks[i].title = title
    setLinks(newLinks)
  }

  const handleUrlChange = (i: number, url: string) => {
    const newLinks = links
    newLinks[i].url = url
    setLinks(newLinks)
  }

  const removeLink = (i: number) => {
    var newLinks = [] as {
      id: number
      title: string
      url: string
    }[]
    for (const link of links) {
      if (link.id !== i) {
        newLinks = [...newLinks, link]
      }
    }
    setLinks(newLinks)
  }

  const handleSave = () => {
    if (title.trim()) {
      setIsSaving(true)
      onSave!({
        title: "string",
        description: "string",
        price: "string",
        links: [] as WishlistItemLink[],
        reservable: true
      })
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
      <Section
        header="Title"
      >
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Section>

      {/* Description Section */}
      <Section
        header="Description"
      >
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </Section>

      {links.map((link) =>
        <Section header={
          <Section.Header>{"Link"}
            <Button mode="plain"
                    onClick={() => removeLink(link.id)}>
              Remove
            </Button>
          </Section.Header>
        }>
          <Input key={"linkTitle" + link.id} name={"linkTitle" + link.id} header={"Title"} value={link.title}
                 onChange={(e) => handleTitleChange(link.id, e.target.value)}/>
          <Textarea key={"linkUrl" + link.id} name={"linkUrl" + link.id} header={"Url"} value={link.url}
                    onChange={(e) => handleUrlChange(link.id, e.target.value)}/>
        </Section>
      )}

      <Section>
        <Button mode="outline" onClick={addLink}>Add link</Button>
      </Section>

      {/* Privacy Settings Section */}
      <Section
        header="Privacy settings"
      >
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
          onClick={handleSave}
          disabled={!title.trim() || isSaving}
          loading={isSaving}
          before={<Icon28Plus/>}
        >
          Create list
        </Button>
      </Section>
    </List>
  );
};
