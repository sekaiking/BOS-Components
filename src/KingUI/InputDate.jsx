const placeholder = props.placeholder ?? "Placeholder";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
const min = props.min ?? "";
const max = props.max ?? "";

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
  position: relative;
  width: 100%;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0.25em;
  }
`;

return (
  <Input
    type="date"
    placeholder={placeholder}
    value={value}
    onChange={({ target: { value } }) => onChange(value)}
    onBlur={() => validate()}
    min={min}
    max={max}
  />
);
