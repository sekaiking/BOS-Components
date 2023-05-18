const NFTMedia =
  "https://media.discordapp.net/attachments/1054482850524704849/1107288672904163388/Achraf_Semi-abstract_digital_art_for_an_NFT_badge_representing__4303ca07-6941-49d8-8a7c-3b50da440453.png?width=1372&height=1372";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #08cc86;
  font-family: monospace;

  h1 {
    font-size: 42px;
    font-weight: 500;
    margin-bottom: 24px;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 24px;
  }
`;

const NFTContainer = styled.div`
  width: 360px;
  height: 500px;
  background: #03080a;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  border: 2px solid #08cc86;

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    animation: rotate 15s ease infinite;
    transform-style: preserve-3d;
    @keyframes rotate {
      0% {
        transform: rotateY(0deg) rotateX(0deg) scale(0.9);
        opacity: 0.8;
      }
      20% {
        transform: rotateY(10deg) rotateX(10deg) scale(1);
        opacity: 0.9;
      }
      40% {
        transform: rotateY(-5deg) rotateX(-20deg) scale(0.9);
        opacity: 0.8;
      }
      60% {
        transform: rotateY(15deg) rotateX(-15deg) scale(1.1);
        opacity: 1;
      }
      80% {
        transform: rotateY(-15deg) rotateX(15deg) scale(1);
        opacity: 0.9;
      }
      100% {
        transform: rotateY(5deg) rotateX(-10deg) scale(0.9);
        opacity: 0.8;
      }
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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: black;
  z-index: -1;
`;

return (
  <>
    <Background />
    <Wrapper>
      <div class="row g-5">
        <div class="col-lg-7 order-lg-1 order-2 d-flex flex-column justify-content-center">
          <h1>
            Congratulations! You have successfully claimed your human NFT.
          </h1>
          <p>
            You wanna get more free NFTs? Refer your friends and earn more NFTs.
          </p>
          <Button href="/sking.near/widget/IAH.Invite">Invite Friends</Button>
        </div>
        <div class="col-lg-5 d-flex align-items-center justify-content-center order-lg-2 order-1">
          <NFTContainer>
            <img src={NFTMedia} alt="Human NFT" />
          </NFTContainer>
        </div>
      </div>
      <Widget src="sking.near/widget/IAH.Common.HowToInvite" />
    </Wrapper>
  </>
);
