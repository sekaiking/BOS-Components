const accountId = props.accountId ?? context.accountId;
const NFT_CONTRACT = props.NFT_CONTRACT;

if (!accountId) {
  // not logged in
  return "";
}

const userlist = Near.view(
  NFT_CONTRACT,
  "users_by_referrer",
  {
    account_id: accountId,
  },
  undefined,
  false
);
console.log("userlist", userlist, NFT_CONTRACT);

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #08cc86;
  &:last-child {
    border-bottom: none;
  }

  .rank {
    width: 30px;
  }
  .user {
    flex: 1;
    text-align: left;
    margin: 0 16px;
    color: #08cc86;
    text-decoration: none;
  }
`;

const Row = ({ accountId }) => (
  <RowWrapper>
    <a
      className="user"
      href={`#/near/widget/ProfilePage?accountId=${accountId}`}
    >
      {accountId}
    </a>
  </RowWrapper>
);

const Wrapper = styled.div`
  border: 2px solid #08cc86;
  color: #08cc86;
  display: flex;
  flex-direction: column;
  padding: 28px;
  margin: 0 10px auto;
  width: 100%;
  max-width: 500px;
  border-radius: 18px;
  flex: 1;
`;

return (
  <Wrapper>
    <h3 className="text-center mb-3">Your Referral List</h3>
    {userlist.map((row, i) => (
      <Row key={i} accountId={row} />
    ))}
    {userlist.length === 0 && (
      <div className="text-center">No referrals yet</div>
    )}
  </Wrapper>
);
