const Button = ({ children, textOnly, customClasses = "", ...props }) => {
  let cssClasses = textOnly
    ? "text-[#1d1a16] hover:text-[#312c1d] active:text-[#312c1d]"
    : "cursor-pointer bg-[#ffc404] border border-[#ffc404] text-[#1f1a09] py-0.5 px-1 rounded-sm " +
      "hover:bg-[#3ffab05] hover:text-[#3ffab05] active:bg-[#3ffab05] active:text-[#1f1a09]";

  cssClasses += " " + customClasses;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;