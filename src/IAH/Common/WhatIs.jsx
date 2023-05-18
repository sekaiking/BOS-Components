const Wrapper = styled.div`
  margin: 48px 12px;
  color: #08cc86;
  font-family: monospace;
  display: flex;
  gap: 36px;
  flex-wrap: wrap-reverse;
  align-items: center;
    justify-content: center;

  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 28px;
  }

  .text {
    flex: 3;
    min-width: 400px;
  }
  .image {
    flex: 2;
    display: flex;
    align-items: center;
    min-width: 400px;
    margin: auto;
    
    img {
        margin: auto;
    border-radius: 100%;
    overflow: hidden;
      aspect-ratio: 1
      width: 400px;
        height: 400px;
      object-fit: cover;
      max-width: 100%;
      border: 2px solid #08cc86;
    }
  }
`;

const Button = styled.a`
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

  &:hover {
    text-decoration: none;
    background: #08cc86;
    color: #03080a;
    transform: translateY(-2px);
  }
`;

return (
  <Wrapper>
    <div className="text">
      <h2>
        What is <b>I-Am-Human</b>?
      </h2>
      <p>
        "I-AM-HUMAN" is a proof-of-personhood protocol on the NEAR blockchain.
        Its purpose is to establish a user's identity as a unique human being,
        which can be especially useful for services where individuality is
        crucial, such as voting, universal basic income, reputation systems, and
        more. This is accomplished through a variety of verification methods
        such as face verification, community verification, and no-knowledge KYC.
        <br />
        <br />
        Each successful verification grants a Soulbound Token (SBT) to the user,
        which is minted on the NEAR blockchain. Once a user accumulates enough
        SBTs, they are recognized as a "unique human" and gain access to various
        applications, like voting in the Near Digital Collective (NDC).
        <br />
        <br />
        The protocol is open and public, so once a user establishes their
        "unique human" status, it can be utilized across different websites,
        apps, DAOs, and other protocols on NEAR, eliminating the need to
        establish proof of personhood multiple times. This also allows for easy
        modification and adaptation of the protocol by different services,
        fostering a more inclusive and versatile digital ecosystem.
      </p>
      <Button
        href="https://i-am-human.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More
      </Button>
    </div>
    <div className="image">
      <img
        src="https://media.discordapp.net/attachments/1054482850524704849/1107577833364135936/Achraf_Semi-abstract_digital_art_for_an_NFT_badge_representing__b676cc84-bc32-4eb7-ab4b-4892824385a3.png?width=1372&height=1372"
        alt="I Am Human"
      />
    </div>
  </Wrapper>
);
