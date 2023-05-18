// Static

const widgetAuthor = props.widgetAuthor || "sking.near";
const UIKingWidgetAuthor = props.UIKingWidgetAuthor || "sking.near";

const createdAt = new Date(props.createdAt).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
const deadline = new Date(props.deadline).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const status = props.status;

function removeMarkdown(md, maxLength) {
  const regex =
    /[_*~#`\-+\\]+|\[(.*?)\]\(.*?\)|\!\[(.*?)\]\(.*?\)|\n(#+|\d+\.|\*|\-|\+)\s/g;
  const nmd = md.replace(regex, "$1$2");
  return nmd.slice(0, maxLength);
}

const description = props.description ?? "";
const shortDescription = removeMarkdown(description, 200);

// Styles
const GigCard = styled.div`
  color: #1b1b18;
  position: relative;
  background: white;
  transition: all 0.1s ease-in;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-bottom: none;

  &:last-child {
    border-bottom: 1px solid #e6e6e6;
  }

  ${!props.is_expanded &&
  ` 
    cursor: pointer;
    &:hover {
      text-decoration: none;
      color: #1b1b18;
      background: #f8faff;
    }
  `}

  hr {
    margin: 0;
    border-color: #a1a9ba;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 16px 36px;
  margin-right: auto;
  margin-left: auto;
`;

const ItemsRow = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 8px;
  column-gap: 38px;
  flex-wrap: wrap;
`;

const TagsList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

// renderer
const Title = props.title && (
  <Widget
    src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
    props={{ text: props.title, variant: "bigHeader" }}
  />
);
const CreatedBy = props.creator && (
  <div>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Created by",
        variant: "tinyHeader",
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: props.creator,
        variant: "label",
      }}
    />
  </div>
);
const CreatedAt = props.createdAt && (
  <div>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Created at",
        variant: "tinyHeader",
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: createdAt,
        variant: "label",
      }}
    />
  </div>
);
const Status = props.status && (
  <div>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Status",
        variant: "tinyHeader",
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: props.status,
        variant: "label",
      }}
    />
  </div>
);
const Skills = props.skills && (
  <div>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Skills",
        variant: "tinyHeader",
      }}
    />
    <TagsList>
      {props.skills.map((skill) => (
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            text: skill,
            variant: "label",
          }}
        />
      ))}
    </TagsList>
  </div>
);
const ExperienceLevel = props.experienceLevel && (
  <div>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Experience Level",
        variant: "tinyHeader",
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: props.experienceLevel,
        variant: "label",
      }}
    />
  </div>
);
const Deadline = props.deadline && (
  <div>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Deadline",
        variant: "tinyHeader",
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: deadline,
        variant: "importantText",
      }}
    />
  </div>
);
const Reward = props.bounty && (
  <div
    style={{
      marginLeft: "auto",
    }}
  >
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Bounty",
        variant: "tinyHeader",
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Price`}
      props={{
        amount: props.bounty,
        size: "medium",
      }}
    />
  </div>
);

let Description = (
  <>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{
        text: "Description",
        variant: "tinyHeader",
      }}
    />
    {!props.description && <p>No description provided</p>}
    {!props.is_expanded && description !== "" && (
      <p>
        {shortDescription}
        <a href="#expand">Read more</a>
      </p>
    )}
    {props.is_expanded && description !== "" && <Markdown text={description} />}
  </>
);

return (
  <GigCard>
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {Title}
        <ItemsRow>{[CreatedBy, CreatedAt, Status]}</ItemsRow>
      </div>
      <div>{Description}</div>
      <ItemsRow>
        {[Skills, ExperienceLevel, Deadline]}
        <div style={{ marginLeft: "auto" }}>{Reward}</div>
      </ItemsRow>
    </Container>
  </GigCard>
);
