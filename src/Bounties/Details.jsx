// Config
const WIDGET_AUTHOR = "sking.near";
const WHITELISTED_ACCOUNTS = ["sking.near", "samora.near"];
const UIKingWidgetAuthor = "sking.near";
const currentUserId = "sking.near";
const MAIN_DB_KEY = `${WIDGET_AUTHOR}-bounties-vALPHA`;

// Props
const { id, blockHeight } = props;

if (!id) {
  throw {
    message:
      "Invalid bounty id, please provide a valid id in this format: '?id=[authorId]@[bountyId]'",
  };
}

// if (!WHITELISTED_ACCOUNTS.includes(accountId)) {
//   return "The bounty author is not whitelisted to show bounties in this widget";
// }

// get data
const authorId = id.split("@")[0];
const bountyId = id.split("@")[1];
const result = Social.getr(
  `${authorId}/${MAIN_DB_KEY}.Bounties/${bountyId}`,
  blockHeight || undefined
);
const bounty = {
  ...result,
  skills: JSON.parse(result.skills),
  blockHeight,
  author: authorId,
  createdAt: bountyId,
};

// Styles
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  overflow: hidden;
  background: #fff;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// Renderer
return (
  <>
    <Widget src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Background`} />
    <Widget src={`${WIDGET_AUTHOR}/widget/Bounties.Components.DetailsHeader`} />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Card`}
      props={{
        is_expanded: true,
        widgetAuthor: WIDGET_AUTHOR,
        title: bounty.title,
        status: bounty.status,
        creator: bounty.author,
        createdAt: bounty.createdAt,
        deadline: bounty.deadline,
        description: bounty.description,
        bounty: bounty.reward,
        skills: bounty.skills,
        experienceLevel: bounty.experienceLevel,
      }}
    />
    <Widget
      src={`${WIDGET_AUTHOR}/widget/Bounties.Components.Proposals`}
      props={{
        widgetAuthor: WIDGET_AUTHOR,
        proposals: [
          {
            authorId: "achraf.near",
            createdAt: 1683227928,
            description: "I will do it",
            status: "Waiting",
          },
          {
            authorId: "sking.near",
            createdAt: 1683227928,
            description: "I will do it",
            status: "Waiting",
          },
        ],
      }}
    />
  </>
);
