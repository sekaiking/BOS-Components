const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const onClose = props.onClose;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  description: state.description,
  token: state.token,
  amount: state.amount,
  times: state.times,
  max_deadline: state.max_deadline,
  deposit: state.deposit,
  gas: state.gas,
});

const handleProposal = () => {
  const bounty = {
    description: state.description,
    token: state.token ?? "",
    amount: state.amount,
    times: JSON.parse(state.times),
    max_deadline: JSON.stringify(state.max_deadline * 3600000000000),
  };
  const gas = state.gas ?? 200000000000000;
  const deposit = state.deposit ?? 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "new bounty proposal",
          kind: {
            AddBounty: {
              bounty,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

const onChangeToken = (token) => {
  State.update({
    token,
  });
};

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

const onChangeTimes = (times) => {
  State.update({
    times,
  });
};

const onChangeDeadline = (max_deadline) => {
  State.update({
    max_deadline,
  });
};

const onChangeDeposit = (deposit) => {
  State.update({
    deposit,
  });
};

const onChangeGas = (gas) => {
  State.update({
    gas,
  });
};

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

  @media (max-width: 600px) {
    border-radius: 0;
  }

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
    font-size: 14px;
    font-weight: 500;
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

return (
  <Wrapper>
    <div className="d-flex justify-content-between align-items-center">
      <h3>Propose New Bounty</h3>
      {onClose && (
        <CloseButton onClick={onClose}>
          <i className="bi bi-x"></i>
        </CloseButton>
      )}
    </div>
    <div className="d-flex gap-3 flex-wrap">
      <div>
        <h5>DAO</h5>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: daoId, tooltip: true }}
        />
      </div>
      <div className="ms-sm-5">
        <h5>Proposer</h5>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: accountId, tooltip: true }}
        />
      </div>
    </div>

    <div>
      <h5>Bounty Description</h5>
      <Widget
        src="sking.near/widget/Common.Inputs.Markdown"
        props={{
          onChange: (value) => onChangeDescription(value),
          height: "270px",
          initialText: `#### [Replace this with your bounty title]\n\n##### Description\n\n##### Acceptance Criteria\n\n##### Steps to Claim\n\n##### Additional Information\n`,
        }}
      />
    </div>

    <div>
      <h5>Reward Token ID</h5>
      <input
        type="text"
        onChange={(e) => onChangeToken(e.target.value)}
        placeholder="Leave empty for NEAR"
      />
    </div>

    <div className="row gap-4 gap-sm-0">
      <div className="col-sm">
        <h5>Amount of Token to be Paid per Bounty Claim</h5>
        <input
          type="number"
          onChange={(e) => onChangeAmount(e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>
      <div className="col-sm">
        <h5>How many times can a bounty be claimed?</h5>
        <input
          type="number"
          onChange={(e) => onChangeTimes(e.target.value)}
          min="1"
          placeholder="0"
        />
      </div>
      <div className="col-sm">
        <h5>Number of hours (after claim) until the deadline:</h5>
        <input
          type="number"
          onChange={(e) => onChangeDeadline(e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm">
        <h5>Deposit</h5>
        <input
          type="number"
          onChange={(e) => onChangeDeposit(e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>
      <div className="col-sm">
        <h5>Gas</h5>
        <input
          type="number"
          onChange={(e) => onChangeGas(e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>
    </div>
    <button className="btn btn-success" onClick={handleProposal}>
      Propose Bounty
    </button>
  </Wrapper>
);
