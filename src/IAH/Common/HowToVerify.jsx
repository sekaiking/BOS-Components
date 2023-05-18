const { isVerified, onClaim } = props;

const Wrapper = styled.div`
  margin: 48px 12px;
  color: #08cc86;
  font-family: monospace;

  .steps {
    padding: 36px;
    border-radius: 20px;
    background: #03080a;
    border: 2px solid #08cc86;
    display: flex;
    flex-direction: column;
    gap: 48px;
    align-items: start;

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 28px;
  }
`;

const Button = styled.button`
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

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
return (
  <Wrapper id="how-to-verify">
    <h2>
      Ready to secure your <b>human NFT</b>? Let's get started.
    </h2>
    <div className="steps">
      <div>
        <h3>Step 1</h3>
        <p>
          Use the button below. You'll be redirected to the I-Am-Human app for
          human verification.
        </p>
        {isVerified ? (
          "You're verified!"
        ) : (
          <a
            href="https://i-am-human.app"
            disabled={isVerified}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <Button>Verify My Identity</Button>
          </a>
        )}
      </div>
      <div>
        <h3>Step 2</h3>
        <p>
          Follow the in-app instructions to verify your identity. Afterward,
          return and refresh this page.
        </p>
      </div>
      <div>
        <h3>Step 3</h3>
        <p>
          Press the 'Claim My NFT' button below to obtain your unique human NFT.
        </p>
        <Button onClick={onClaim} disabled={!isVerified}>
          Claim My NFT
        </Button>
      </div>
    </div>
  </Wrapper>
);
