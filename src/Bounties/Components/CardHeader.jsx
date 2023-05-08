
const widgetAuthor = props.widgetAuthor || "sking.near";
const UIKingWidgetAuthor = props.UIKingWidgetAuthor || "sking.near";

return (
  <div
    style={{
      display: "flex",
      gap: "8px",
    }}
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
        onClick: props.onBack,
      }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Button`}
      props={{
        text: "Back",
        variant: "text",
        onClick: props.onBack,
      }}
    />
  </div>
);
