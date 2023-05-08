const widgetAuthor = props.widgetAuthor || "sking.near";
const UIKingWidgetAuthor = props.UIKingWidgetAuthor || "sking.near";

const SectionHeader = styled.div`
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h2 {
    font-size: 1.4rem;
  }
`;

const Proposal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
  background: #f8faff;
  border-radius: 24px;
  padding: 24px;

  .proposal-header {
    margin-right: auto;
  }
`;

return (
  <>
    <SectionHeader>
      <h2>Proposals</h2>
      <Widget
        src={`${UIKingWidgetAuthor}/widget/KingUI.Button`}
        props={{
          text: "Apply Now",
          onClick: () => alert("clicked"),
        }}
      />
    </SectionHeader>
    {props.proposals?.length === 0 && (
      <div>No proposals yet</div>
    )}
    {props.proposals &&
      props.proposals.map((proposal) => (
        <Proposal>
          <div className="proposal-header">
            <Widget
              src="near/widget/AccountProfile"
              props={{ accountId: proposal.authorId }}
            />
          </div>
          <div className="proposal-body">
            <Widget
              src="near/widget/SocialMarkdown"
              props={{ text: proposal.description }}
            />
          </div>
        </Proposal>
      ))}
  </>
);
