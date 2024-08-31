import { FaCircle, FaSquareFull } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

type VariantType = "Stop" | "Record" | "Review";
type ButtonType = {
  variant: VariantType,
  label: string,
  onClick: () => void,
  disabled?: boolean,
  active?: boolean,
};

const Button = ({
  variant,
  label,
  onClick,
  disabled,
  active,
}: ButtonType) => {
  const safeLabel = label.toLowerCase().replaceAll(" ", "-");
  const variantIconography = (variant: VariantType) => {
    switch(variant) {
      case "Stop":
        return <FaSquareFull />;
      case "Record":
        return <FaCircle />;
      case "Review":
        return <FaPlay />;
    }
  };

  return (
    <div className="button-wrapper">
      <button
        type="button"
        aria-label={label}
        name={`button-${safeLabel}`}
        id={`button-${safeLabel}`}
        onClick={onClick}
        disabled={disabled}
        className={`${variant.toLowerCase()}${active ? " active" : ""}`}
      >
        {variantIconography(variant)}
      </button>
      <div>
        <label htmlFor={`button-${safeLabel}`} className={disabled ? "disabled-label" : ""} >{label}</label>
      </div>
    </div>
  );
};

export default Button;
