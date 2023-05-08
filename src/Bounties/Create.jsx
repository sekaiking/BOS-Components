// Config
const WIDGET_AUTHOR = "sking.near";
const COUNCIL_ACCOUNTS = ["achraf.near", "sking.near", "samora.near"];
const UIKingWidgetAuthor = "sking.near";
const currentUserId = "sking.near";
const MAIN_DB_KEY = `${WIDGET_AUTHOR}-bounties-vALPHA`;

// SocialDB calls
const saveBounty = ({
  title,
  skills,
  experienceLevel,
  description,
  deadline,
  reward,
}) => {
  const id = new Date().getTime();

  const new_bounty = {
    [`${MAIN_DB_KEY}.Bounties`]: {
      [id]: {
        title: title,
        skills: skills,
        experienceLevel: experienceLevel,
        status: "open",
        description: description,
        deadline: deadline,
        reward: reward,
      },
    },
    index: {
      [MAIN_DB_KEY]: JSON.stringify({
        key: "bounty",
        value: id,
      }),
    },
  };
  
  Social.set(new_bounty, { force: true });
};

// Render
return (
  <>
    <Widget src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Background`} />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Header`}
      props={{
        widgetAuthor: WIDGET_AUTHOR,
        UIKingWidgetAuthor: UIKingWidgetAuthor,
      }}
    />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.FormCreate`}
      props={{
        widgetAuthor: WIDGET_AUTHOR,
        UIKingWidgetAuthor: UIKingWidgetAuthor,
        onCreate: saveBounty,
      }}
    />
  </>
);
