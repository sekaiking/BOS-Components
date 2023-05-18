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

return (
  <Container>
    <a
      style={{
        display: "flex",
        gap: "8px",
        textDecoration: "none",
      }}
      href={`#/${widgetAuthor}/widget/Bounties.Explore`}
    >
      <Widget
        src={`${UIKingWidgetAuthor}/widget/KingUI.ButtonIcon`}
        props={{
          icon: (
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#1b1b18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"></path>
            </svg>
          ),
        }}
      />
      <Widget
        src={`${UIKingWidgetAuthor}/widget/KingUI.Button`}
        props={{
          text: "Back",
          variant: "text",
        }}
      />
    </a>
  </Container>
);
