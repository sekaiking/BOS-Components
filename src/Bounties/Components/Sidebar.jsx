// Static

const widgetAuthor = props.widgetAuthor || "sking.near";
const UIKingWidgetAuthor = "sking.near";

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-right: none;
  padding: 16px 36px;
  margin-right: auto;
  margin-left: auto;
`;

const Hr = styled.hr`
  border-top: 1px solid #ccc;
  margin: 20px 0;
  background-color: none;
`;



// Render
return (
  <Container>
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{ text: "Skills", variant: "tinyHeader" }}
    />
    <Typeahead
      options={[
        "Frontend",
        "Backend",
        "Rust",
        "Javascript",
        "Solidity",
        "Design",
        "Marketing",
        "Community",
        "Writing",
        "Other",
      ]}
      multiple
      onChange={(value) => {
        props.onFilterChange("skills", value);
      }}
      placeholder="Search for skills"
    />
    <Hr />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{ text: "Status", variant: "tinyHeader" }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.InputRadio`}
      props={{
        defaultValue: "open",
        options: [
          "open",
          "in progress",
          "submitted",
          "done",
          "rejected",
          "cancelled",
          "all",
        ],
        onChange: (value) => {
          props.onFilterChange("status", value);
        },
        value: props.filters.status,
      }}
    />
    <Hr />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
      props={{ text: "Experience Level", variant: "tinyHeader" }}
    />
    <Widget
      src={`${UIKingWidgetAuthor}/widget/KingUI.InputRadioToggle`}
      props={{
        defaultValue: ["beginner", "intermediate", "advanced"],
        options: ["beginner", "intermediate", "advanced"],
        onChange: (value) => {
          props.onFilterChange("experienceLevel", value);
        },
        value: props.filters.experienceLevel,
      }}
    />
  </Container>
);
