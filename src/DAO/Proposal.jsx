const daoId = props.daoId ?? "multi.sputnik-dao.near";

const proposal = props.proposal ?? {
  id: 1,
  proposer: "hack.near",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut pharetra orci. Aliquam vitae enim tincidunt sapien fermentum scelerisque.",
  kind: { AddMemberToRole: { member_id: "hack.near", role: "community" } },
  status: "Approved",
  vote_counts: { council: [1, 0, 0] },
  votes: { "infinity.near": "Approve" },
  submission_time: "1682527782646393764",
};

proposal.type =
  typeof proposal.kind === "string"
    ? proposal.kind
    : Object.keys(proposal.kind)[0];
proposal.type = proposal.type.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

proposal.status = proposal.status.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

// ==============================
// Styled Components
// ==============================

const statusColor =
  proposal.status === "Approved"
    ? "#28a930"
    : proposal.status === "In Progress"
    ? "#58a1ff"
    : proposal.status === "Failed"
    ? "#dc3545"
    : "#6c757d";

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

  .status {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: ${statusColor};
  }
`;

const MarkdownContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 24px;
  background-color: #f8f9fa;
  color: #1b1b18;
  border-radius: 16px;
  max-height: 800px;
  overflow-y: auto;
  color: #333;
  line-height: 1.6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  h1 {
    font-size: 2em;
    color: #111;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.3em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.5em;
    color: #222;
    margin-bottom: 0.75em;
  }

  h3 {
    font-size: 1.3em;
    color: #333;
    margin-bottom: 0.6em;
  }

  h4 {
    font-size: 1.2em;
    color: #444;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1.1em;
    color: #555;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1em;
    margin-bottom: 1em;
  }

  a {
    color: #0645ad;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const RenderProposalArgs = () => {
  const proposal_type =
    typeof proposal.kind === "string"
      ? proposal.kind
      : Object.keys(proposal.kind)[0];
  if (proposal_type === "Vote") return null;

  if (proposal_type === "Transfer")
    return (
      <>
        <div>
          <h5>Amount</h5>
          <Widget
            src="sking.near/widget/Common.TokenAmount"
            props={{
              amountWithoutDecimals: proposal.kind.Transfer.amount,
              address: proposal.kind.Transfer.token_id,
            }}
          />
        </div>
        <div>
          <h5>Receiver</h5>
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: proposal.kind.Transfer.receiver_id,
              tooltip: true,
            }}
          />
        </div>
      </>
    );

  if (proposal_type === "FunctionCall") {
    return proposal.kind.FunctionCall.actions.reduce(
      (acc, { method_name, args, deposit }) => {
        return acc.concat(
          <div
            className="d-flex flex-wrap align-items-start w-100"
            style={{
              columnGap: "48px",
              rowGap: "16px",
            }}
          >
            <div>
              <h5>Smart Contract Address</h5>
              <p>{proposal.kind.FunctionCall.receiver_id}</p>
            </div>
            <div>
              <h5>Method Name</h5>
              <p>{method_name}</p>
            </div>
            <div>
              <h5>Deposit</h5>
              <Widget
                src="sking.near/widget/Common.TokenAmount"
                props={{
                  amountWithoutDecimals: deposit,
                  address: "",
                }}
              />
            </div>
            <div className="w-100">
              <h5>Arguments</h5>
              <Markdown
                // Decode the args (Base64) to String then Parse the Json then format it and display it as markdown code
                text={
                  "```json\n" +
                  JSON.stringify(
                    JSON.parse(Buffer.from(args, "base64").toString("utf8")),
                    null,
                    2
                  ) +
                  "\n```"
                }
              />
            </div>
          </div>
        );
      },
      []
    );
  }

  if (
    proposal_type === "AddMemberToRole" ||
    proposal_type === "RemoveMemberFromRole"
  )
    return (
      <>
        <div>
          <h5>Member</h5>
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: proposal.kind.AddMemberToRole.member_id,
              tooltip: true,
            }}
          />
        </div>
        <div>
          <h5>Role</h5>
          <p>{proposal.kind.AddMemberToRole.role}</p>
        </div>
      </>
    );

  if (proposal_type === "AddBounty")
    return (
      <>
        <div>
          <h5>Amount</h5>
          <Widget
            src="sking.near/widget/Common.TokenAmount"
            props={{
              amountWithoutDecimals: proposal.kind.AddBounty.bounty.amount,
              address: proposal.kind.AddBounty.bounty.token,
            }}
          />
        </div>
        <div>
          <h5>Times</h5>
          <p>{proposal.kind.AddBounty.bounty.times}</p>
        </div>
        <div>
          <h5>Deadline</h5>
          <p>
            {new Date(
              proposal.kind.AddBounty.bounty.max_deadline
            ).toLocaleString()}
          </p>
        </div>
        <div>
          <h5>Bounty Description</h5>
          <p>{proposal.kind.AddBounty.bounty.description}</p>
        </div>
      </>
    );

  if (proposal_type === "BountyDone")
    return (
      <>
        <div>
          <h5>Receiver</h5>
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: proposal.kind.BountyDone.receiver_id,
              tooltip: true,
            }}
          />
        </div>
        <div>
          <h5>Bounty ID</h5>
          <p>{proposal.kind.BountyDone.bounty_id}</p>
        </div>
      </>
    );
};

return (
  <Wrapper>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h5>Proposal ID: {proposal.id}</h5>
        <h3>{proposal.type}</h3>
      </div>
      <div className="d-flex flex-column align-items-end">
        <h5>Status</h5>
        <span className="status">{proposal.status}</span>
      </div>
    </div>
    <div>
      <h5>Proposer</h5>
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId: proposal.proposer, tooltip: true }}
      />
    </div>
    <div>
      <h5>Description</h5>
      {proposal.type !== "Vote" && <p>{proposal.description}</p>}
      {proposal.type === "Vote" && (
        <MarkdownContainer>
          <Markdown text={proposal.description} />
        </MarkdownContainer>
      )}
    </div>
    <div className="d-flex gap-5 flex-wrap align-items-start">
      <RenderProposalArgs />
    </div>

    <div className="w-100">
      <h5>Votes</h5>
      <Widget
        src="sking.near/widget/DAO.Proposal.Vote"
        props={{
          daoId: daoId,
          proposal: proposal,
        }}
      />
    </div>
  </Wrapper>
);
