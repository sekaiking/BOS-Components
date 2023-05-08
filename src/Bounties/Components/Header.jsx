const widgetAuthor = props.widgetAuthor || "sking.near";
const UIKingWidgetAuthor = props.UIKingWidgetAuthor || "sking.near";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.6em;
  color: #2416bd;
  background-color: #fff;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 800;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const NavLink = styled.a`
  margin-left: 1rem;
  color: #1b1b18;
  font-weight: 600;
  font-size: 0.9rem;

  &:hover {
    text-decoration: none;
    color: #2416bd;
  }
`;

return (
  <Container>
    <Title>NDC - Bounties</Title>
    <Nav>
      <NavLink href={`#/${widgetAuthor}/widget/Bounties.Explore`}>
        Explore Bounties
      </NavLink>
      <a href={`#/${widgetAuthor}/widget/Bounties.Create`}>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Button`}
          props={{
            text: "Create Bounty",
          }}
        />
      </a>
    </Nav>
  </Container>
);
