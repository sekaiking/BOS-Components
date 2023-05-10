const daoId = props.daoId ?? "multi.sputnik-dao.near";
const proposalsPerPage = props.proposalsPerPage ?? 5; // Number of proposals to fetch at a time

State.init({
  daoId,
  proposals: [],
  lastProposalId: null, // To keep track of the last loaded proposal
  hasMore: true, // Boolean to know if there are more proposals to load
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
  });
};

return (
  <>
    <div>
      <h3>DAO Proposals</h3>
      <div className="mb-2">
        <p className="m-1">Sputnik Contract ID:</p>
        <input
          type="text"
          placeholder="example.sputnik-dao.near"
          onChange={(e) => onChangeDAO(e.target.value)}
        />
      </div>

      <hr />

      <div>
        <InfiniteScroll loadMore={loadProposals} hasMore={state.hasMore}>
          {state.proposals.map((proposal, i) => (
            <Widget
              key={i}
              src="hack.near/widget/DAO.Proposal"
              props={{ daoId: state.daoId, id: proposal.id }}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  </>
);
