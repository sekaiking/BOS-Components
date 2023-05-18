const accountId = props.accountId ?? context.accountId;
const invitedId = props.invitedId ?? accountId;
const children = props.children ?? "Invite";

const postText = `
Hey! Have you heard about the I-AM-HUMAN verification on the NEAR blockchain? It's a proof-of-personhood protocol, Its purpose is to establish a user's identity as a unique human being.
 You can use the link below to complete it and get a free NFT. Let me know if you're interested and I can send you more details. 😊
\n\n
[https://near.org/sking.near/widget/IAH.Signup?referrer=${accountId}](https://near.org/sking.near/widget/IAH.Signup?referrer=${accountId})
`;

const content = {
  type: "md",
  text: postText,
};

const data = {
  post: {
    main: JSON.stringify(content),
  },
  index: {
    notify: JSON.stringify({
      key: invitedId,
      value: {
        type: "mention",
        item: {
          type: "social",
          path: `${accountId}/post/main`,
        },
      },
    }),
  },
};

const Button = styled.div`
  .button {
    display: block;
    padding: 12px 36px;
    border-radius: 20px;
    background: none;
    border: 2px solid #08cc86;
    color: #08cc86;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s ease;
    cursor: pointer;
    text-align: center;
    margin-right: auto;
    font-weight: 600;

    &:hover {
      text-decoration: none;
      background: #08cc86;
      color: #03080a;
      transform: translateY(-2px);
    }
  }
`;

return (
  <Button>
    <CommitButton force data={data} className="button">
      {children}
    </CommitButton>
  </Button>
);
