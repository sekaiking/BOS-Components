const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #08cc86;
  font-family: monospace;
  height: 100%;
  padding: 12px;

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
    <Background>
      <Wrapper>
        <h1>Please connect your NEAR wallet first.</h1>
        <p>
          You can Create an Account or Login to your existing account using the
          buttons on the top right corner.
        </p>
      </Wrapper>
    </Background>
  </>
);
