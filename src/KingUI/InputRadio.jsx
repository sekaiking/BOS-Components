const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  button {
    all: unset;
  }

  .RadioGroupRoot {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .RadioGroupItem {
    background-color: white;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 1px solid #2416bd;
    transition: 0.2s ease-in-out;
  }
  .RadioGroupItem:hover {
    background-color: #2416bd40;
  }
  .RadioGroupItem:focus {
    background-color: #2416bd40;
  }

  .RadioGroupIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .RadioGroupIndicator::after {
    content: "";
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #2416bd;
  }

  .Label {
    color: black;
    font-size: 15px;
    line-height: 1;
    padding-left: 15px;
    cursor: pointer;
    text-transform: capitalize;
  }
`;
return (
  <FilterContainer>
    <RadioGroup.Root
      className="RadioGroupRoot"
      aria-label="View density"
      defaultValue={props.defaultValue}
      onValueChange={(value) => {
        props.onChange(value);
      }}
      value={props.value}
    >
      {props.options.map((status) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <RadioGroup.Item
            className="RadioGroupItem"
            value={status}
            id={"bsf" + status}
          >
            <RadioGroup.Indicator className="RadioGroupIndicator" />
          </RadioGroup.Item>
          <label className="Label" htmlFor={"bsf" + status}>
            {status}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </FilterContainer>
);