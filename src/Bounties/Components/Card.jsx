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

  ${state.is_expanded
    ? `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    box-shadow: none;
    z-index: 100;
    border-left: none;
    border-radius: 2rem;
    margin: auto;
    margin-bottom: 2rem;
  `
    : `    
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
  gap: 30px;
  flex-wrap: wrap;
`;

const TagsList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

// State

State.init({ is_expanded: false });

// functions

const handleExpandToggle = (is_expanded) => {
  State.update({ is_expanded: is_expanded });
  window.scrollTo(0, 0);
};

// renderer
console.log(props);
return (
  <GigCard>
    {state.is_expanded && (
      <Container>
        <Widget
          src={`${widgetAuthor}/widget/Bounties.Components.CardHeader`}
          props={{
            widgetAuthor: widgetAuthor,
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            onBack: () => handleExpandToggle(false),
          }}
        />
      </Container>
    )}
    {state.is_expanded && <hr />}
    <Container onClick={() => handleExpandToggle(true)}>
      {props.title && (
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{ text: props.title, variant: "bigHeader" }}
        />
      )}
      <ItemsRow>
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
              text: status,
              variant: "label",
            }}
          />
        </div>
      </ItemsRow>
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            text: "Description",
            variant: "tinyHeader",
          }}
        />

        {!props.description && <p>No description provided</p>}
        {!state.is_expanded && description !== "" && (
          <p>
            {shortDescription}
            <a href="#expand">Read more</a>
          </p>
        )}
        {state.is_expanded && description !== "" && (
          <Markdown text={description} />
        )}
      </div>
      <ItemsRow>
        {props.skills && (
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
        )}
        {props.experienceLevel && (
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
        )}
      </ItemsRow>
      <ItemsRow>
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
        <div>
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
      </ItemsRow>
    </Container>
    {state.is_expanded && <hr />}
    {state.is_expanded && (
      <Container>
        <Widget
          src={`${widgetAuthor}/widget/Bounties.Components.CardProposals`}
          props={{
            widgetAuthor: widgetAuthor,
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            proposals: props.proposals,
          }}
        />
      </Container>
    )}
  </GigCard>
);
