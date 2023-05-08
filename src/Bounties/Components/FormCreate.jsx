// Static

const widgetAuthor = props.widgetAuthor || "sking.near";
const UIKingWidgetAuthor = props.UIKingWidgetAuthor || "sking.near";

const Form = styled.div`
  color: #1b1b18;
  position: relative;
  background: white;
  transition: all 0.1s ease-in;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding: 1rem 0;
`;

const Container = styled.div`
  min-height: 300px;
  padding: 16px 36px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
  color: #101828;
  width: 100%;
`;

const Hr = styled.hr`
  border-top: 1px solid #ccc;
  margin: 0;
  background-color: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  font-size: 14px;
  font-weight: 500;
  color: #101828;
`;

// State
State.init({
  title: "",
  description: "",
  skills: [],
  experienceLevel: "",
  deadline: "",
  reward: "",
});

return (
  <Form>
    <Container>
      <Widget
        src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
        props={{ text: "Create a new Bounty", variant: "bigHeader" }}
      />
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            variant: "tinyHeader",
            text: "Bounty Title",
          }}
        />
        <Input
          type="text"
          placeholder={"Short and descriptive title of the bounty"}
          value={state.title}
          onChange={({ target: { value } }) => {
            State.update({ ...state, title: value });
          }}
        />
      </div>
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            variant: "tinyHeader",
            text: "Bounty Description",
          }}
        />
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.InputMarkdown`}
          props={{
            onChange: (value) => {
              State.update({ ...state, description: value });
            },
            height: "360px",
            initialText:
              "#### Description\n\n#### Deliverables\n\n#### Acceptance Criteria\n\n#### Additional Information\n\n#### Contact Information\n\n#### Attachments",
          }}
        />
      </div>
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            variant: "tinyHeader",
            text: "Requested Skills",
          }}
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
            State.update({ ...state, skills: value });
          }}
          placeholder="Search for skills"
        />
      </div>
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            variant: "tinyHeader",
            text: "Experience Level",
          }}
        />
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.InputRadio`}
          props={{
            value: state.experienceLevel,
            defaultValue: "beginner",
            options: ["beginner", "intermediate", "advanced"],
            onChange: (value) => {
              State.update({ ...state, experienceLevel: value });
            }
          }}
        />
      </div>
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            variant: "tinyHeader",
            text: "Submission Deadline",
          }}
        />
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.InputDate`}
          props={{
            onChange: (value) => {
              State.update({ ...state, deadline: value });
            },
            value: state.deadline,
            min: new Date().toISOString().split("T")[0],
          }}
        />
      </div>
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Text`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            variant: "tinyHeader",
            text: "Bounty Reward",
          }}
        />
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.InputNumber`}
          props={{
            onChange: (value) => {
              State.update({ ...state, reward: value });
            },
            value: state.reward || 0,
            min: 0,
            currency: "NEAR",
          }}
        />
      </div>
      <Hr />
      <div>
        <Widget
          src={`${UIKingWidgetAuthor}/widget/KingUI.Button`}
          props={{
            UIKingWidgetAuthor: UIKingWidgetAuthor,
            text: "Create Bounty",
            onClick: () => {
              console.log(state);
              props.onCreate(state);
            },
          }}
        />
      </div>
    </Container>
  </Form>
);
