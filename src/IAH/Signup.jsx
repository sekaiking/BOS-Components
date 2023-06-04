const referrer = props.referrer ?? Storage.privateGet("IAH.Signup.Referrer");
const accountId = props.accountId ?? context.accountId;
const NFT_CONTRACT = "v1a.humanft.near";
const IAH_CONTRACT = "registry.i-am-human.near";
const GD_CONTRACT = "fractal.i-am-human.near";
const WIDGET_AUTHOR = "sking.near";

if (!accountId) {
  // not logged in
  return <Widget src={`${WIDGET_AUTHOR}/widget/IAH.Signup.Guest`} />;
}

State.init({
  tokens: undefined,
});

Storage.privateSet("IAH.Signup.Referrer", referrer);

const hasBadge = Near.view(
  NFT_CONTRACT,
  "already_verified",
  {
    account_id: accountId,
  },
  undefined,
  false
);
if (hasBadge === null) return "Loading...";

console.log("hasBadge", hasBadge);

if (hasBadge) {
  // already claimed his nft badge
  return <Widget src={`${WIDGET_AUTHOR}/widget/IAH.Signup.Complete`} />;
}

const tokens = Near.view(
  IAH_CONTRACT,
  "sbt_tokens_by_owner",
  {
    account: accountId,
  },
  undefined,
  true
);
if (tokens === null) return "Loading...";

if (isVerified) {
  // is verified on IAH but didn't claim his nft badge yet
  return (
    <Widget
      src={`${WIDGET_AUTHOR}/widget/IAH.Signup.Verified`}
      props={{
        accountId,
        referrerId: referrer ?? "sking.near",
        NFT_CONTRACT,
      }}
    />
  );
}

return (
  <Widget
    src={`${WIDGET_AUTHOR}/widget/IAH.Signup.Invited`}
    props={{
      accountId,
      referrerId: referrer ?? "sking.near",
      NFT_CONTRACT,
      tokens,
      GD_CONTRACT,
    }}
  />
);
