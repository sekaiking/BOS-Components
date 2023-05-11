const accountId = props.accountId ?? context.accountId;

const daoId = props.daoId ?? "multi.sputnik-dao.near";

const bounty = props.bounty ?? {
  id: 888,
  description: `
  #### Bounty Title Here
  ##### Description
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod
  semper nisi, sit amet dictum mauris. Nulla facilisi. Nulla facilisi.
  Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. 

  ##### Requirements
  Example of **markdown** *code* with an [url](example.com)
  `,
  times: 1,
  amount: "1000000000000000000000000",
  max_deadline: "86400000000000",
};

// ==============================
// Functions
// ==============================

const handleClaim = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "bounty_claim",
      args: {
        id: JSON.parse(bounty.id),
        deadline: bounty.max_deadline,
      },
      deposit: 100000000000000000000000,
      gas: 150000000000000,
    },
  ]);
};

const handleUnclaim = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "bounty_giveup",
      args: {
        id: JSON.parse(bounty.id),
      },
      gas: 150000000000000,
    },
  ]);
};

const handleSubmit = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "work submitted",
          kind: {
            BountyDone: {
              receiver_id: accountId,
              bounty_id: JSON.parse(bounty.id),
            },
          },
        },
      },
      deposit: 100000000000000000000000,
      gas: 150000000000000,
    },
  ]);
};

// ==============================
// Styled Components
// ==============================

const Wrapper = styled.div`
  margin: 16px auto;
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

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #eceef0;
`;

const Button = styled.div`
  width: 100%;
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

const claims = Near.view(daoId, "get_bounty_claims", {
  account_id: accountId,
});

return (
  <Wrapper>
    <div className="w-100">
      <h5>Bounty ID: {bounty.id}</h5>
      <Markdown text={bounty.description} />
    </div>
    <div className="d-flex flex-wrap gap-5">
      <div>
        <h5>Amount</h5>
        <Widget
          src="sking.near/widget/Common.TokenAmount"
          props={{
            amountWithoutDecimals: bounty.amount,
            address: bounty.token,
          }}
        />
      </div>
      <div>
        <h5>Hours</h5>
        <p>{bounty.max_deadline / 3600000000000}</p>
      </div>
    </div>
    <CardFooter>
      {!claims.length > 0 && (
        <ButtonLink onClick={handleClaim}>
          Claim ({bounty.times - claims.length} left)
        </ButtonLink>
      )}
      {claims.length > 0 && (
        <ButtonLink onClick={handleSubmit}>Submit</ButtonLink>
      )}
      {claims.length > 0 && (
        <ButtonLink onClick={handleUnclaim}>Unclaim</ButtonLink>
      )}
    </CardFooter>
  </Wrapper>
);
