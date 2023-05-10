const daoId = props.daoId ?? "multi.sputnik-dao.near";
const limit = props.limit ?? 30; // Number of most recent proposals to fetch

const lastProposalId = Near.view(daoId, "get_last_proposal_id");
const fromIndex = Math.max(0, lastProposalId - limit + 1); // Ensures fromIndex is never less than 0

const proposals = Near.view(daoId, "get_proposals", {
  from_index: fromIndex,
  limit: limit,
});

State.init({
  daoId,
});

const onChangeDAO = (daoId) => {
  State.update({
    daoId,
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
        {proposals
          .slice()
          .reverse()
          .map((proposal, i) => (
            <Widget
              key={i}
              src="hack.near/widget/DAO.Proposal"
              props={{ daoId: state.daoId, id: proposals.length - i - 1 }}
            />
          ))}
      </div>
    </div>
  </>
);
