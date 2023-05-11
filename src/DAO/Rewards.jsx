const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

State.init({
  showCreateProposal: false,
});

const ButtonLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  white-space: nowrap;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  padding: 8px 32px;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  @media (max-width: 1200px) {
    padding: 8px 16px;
  }
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  padding: 16px;

  @media (max-width: 600px) {
    padding: 0;
    & > * {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;

return (
  <>
    <div className="d-flex justify-content-between flex-wrap">
      <h3>
        DAO Rewards
      </h3>
      <ButtonLink
        onClick={() => State.update({ ...state, showCreateProposal: true })}
      >
        <i className="bi bi-16 bi-plus-lg"></i>
        Propose Bounty
      </ButtonLink>
    </div>

    <Widget
      src="sking.near/widget/DAO.Reward.Claim"
      props={{ daoId: daoId, accountId: accountId }}
    />

    {state.showCreateProposal && (
      <PopupWrapper
        id="create-proposal-popup"
        onClick={(e) => {
          if (e.target.id === "create-proposal-popup") {
            State.update({ ...state, showCreateProposal: false });
          }
        }}
      >
        <Widget
          src={"sking.near/widget/DAO.Reward.Proposal"}
          props={{
            daoId: daoId,
            accountId: accountId,
            onClose: () =>
              State.update({ ...state, showCreateProposal: false }),
          }}
        />
      </PopupWrapper>
    )}
  </>
);
