const WIDGET_AUTHOR = "sking.near";
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const proposalsPerPage = props.proposalsPerPage ?? 5; // Number of proposals to fetch at a time

State.init({
  daoId,
  proposals: [],
  lastProposalId: null, // To keep track of the last loaded proposal
  hasMore: true, // Boolean to know if there are more proposals to load
  showCreateProposal: false,
});

const loadProposals = () => {
  const lastProposalId =
    state.lastProposalId !== null
      ? state.lastProposalId
      : Near.view(daoId, "get_last_proposal_id");
  if (lastProposalId === null) return;

  const fromIndex = Math.max(0, lastProposalId - proposalsPerPage + 1); // Ensures fromIndex is never less than 0
  const limit = fromIndex === 0 ? lastProposalId + 1 : proposalsPerPage; // Ensure we don't fetch the same proposals twice if fromIndex is 0

  const newProposals = Near.view(daoId, "get_proposals", {
    from_index: fromIndex,
    limit: limit,
  });
  if (newProposals === null) return;

  State.update({
    ...state,
    hasMore: fromIndex > 0,
    proposals: [...state.proposals, ...newProposals.reverse()],
    lastProposalId: fromIndex - 1,
  });
};

const onChangeDAO = (newDaoId) => {
  State.update({
    daoId: newDaoId,
    proposals: [],
    lastProposalId: null,
    hasMore: true,
    showCreateProposal: false,
  });
};

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
    <div>
      <div className="d-flex justify-content-between flex-wrap">
        <h3>DAO Proposals</h3>
        <ButtonLink
          onClick={() => State.update({ ...state, showCreateProposal: true })}
        >
          <i className="bi bi-16 bi-plus-lg"></i>
          Create Proposal
        </ButtonLink>
      </div>

      <div className="mb-2">
        <p className="m-1">Sputnik Contract ID:</p>
        <input
          type="text"
          placeholder="example.sputnik-dao.near"
          onChange={(e) => onChangeDAO(e.target.value)}
        />
      </div>
      <hr />

      <InfiniteScroll loadMore={loadProposals} hasMore={state.hasMore}>
        {state.proposals.map((proposal, i) => (
          <Widget
            key={i}
            src={WIDGET_AUTHOR + "/widget/DAO.Proposal"}
            props={{ daoId: state.daoId, proposal: proposal }}
          />
        ))}
      </InfiniteScroll>
    </div>

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
          src={WIDGET_AUTHOR + "/widget/DAO.Proposal.Create"}
          props={{
            daoId: state.daoId,
            onClose: () =>
              State.update({ ...state, showCreateProposal: false }),
          }}
        />
      </PopupWrapper>
    )}
  </>
);
