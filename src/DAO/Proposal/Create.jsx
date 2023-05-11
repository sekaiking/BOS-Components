const daoId = props.daoId ?? "multi.sputnik-dao.near";
const accountId = props.accountId ?? context.accountId;
const onClose = props.onClose;

State.init({
  daoId,
  proposalType: {
    text: "Vote",
    value: "Vote",
  },
});

const Wrapper = styled.div`
  margin: 16px auto;
  max-width: 900px;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 100%;
  overflow-y: auto;

  p {
    line-height: 1.4;
    font-weight: 400;
    font-size: 15px;
    color: #868682;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #1b1b18;
  }

  h5 {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
    color: #6c757d;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(27, 27, 24);
  border-radius: 100px;
  height: 40px;
  width: 40px;
  border: none;
  margin: 0;
  font-size: 26px;
  background-color: rgb(246, 246, 245);

  &:hover {
    background-color: rgb(243, 243, 242);
    color: rgb(0, 0, 0);
  }
`;

const proposalTypes = [
  {
    text: "Vote",
    value: "Vote",
  },
  {
    text: "Transfer",
    value: "Transfer",
  },
  {
    text: "Add Member To Role",
    value: "AddMemberToRole",
  },
  {
    text: "Remove Member From Role",
    value: "RemoveMemberFromRole",
  },
  {
    text: "Function Call",
    value: "FunctionCall",
  },
];

return (
  <Wrapper>
    <div className="d-flex justify-content-between align-items-center">
      <h3>Create Proposal</h3>
      {onClose && (
        <CloseButton onClick={onClose}>
          <i className="bi bi-x"></i>
        </CloseButton>
      )}
    </div>
    <Widget
      src={`sking.near/widget/Common.Inputs.Select`}
      props={{
        label: "Proposal Type",
        noLabel: false,
        placeholder: "Select a Proposal Type",
        options: proposalTypes,
        value: state.proposalType,
        onChange: (proposalType) => State.update({ ...state, proposalType }),
        validate: () => {
          if (!state.proposalType) {
            throw {
              message: "Please select a Proposal Type",
            };
          }

          if (
            !proposalTypes.find(
              ({ value }) => state.proposalType.value === value
            )
          ) {
            throw {
              message: "Please select a valid Proposal Type",
            };
          }
        },
        error: undefined,
      }}
    />
    <div className="d-flex gap-3 flex-wrap">
      <div>
        <h5>DAO</h5>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: daoId, tooltip: true }}
        />
      </div>
      <div>
        <h5>Proposer</h5>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: accountId, tooltip: true }}
        />
      </div>
    </div>
    <div>
      <h5>Arguments</h5>
      {state.proposalType.value === "Vote" && (
        <Widget src="hack.near/widget/CreatePoll" props={{ daoId }} />
      )}
      {state.proposalType.value === "Transfer" && (
        <Widget src="hack.near/widget/TransferProposal" props={{ daoId }} />
      )}
      {state.proposalType.value === "AddMemberToRole" && (
        <Widget src="hack.near/widget/AddMemberToRole" props={{ daoId }} />
      )}
      {state.proposalType.value === "RemoveMemberFromRole" && (
        <Widget src="hack.near/widget/RemoveMemberFromRole" props={{ daoId }} />
      )}
      {state.proposalType.value === "FunctionCall" && (
        <Widget src="hack.near/widget/FunctionCall" props={{ daoId }} />
      )}
    </div>
  </Wrapper>
);