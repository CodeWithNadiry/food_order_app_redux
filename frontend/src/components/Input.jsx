const Input = ({id, label, ...props}) => {
  return (
    <div className="my-0.5 flex flex-col">
      <label htmlFor={id} className="font-bold mb-0.5 text-black">{label}</label>
      <input id={id} name={id} required {...props} className="w-full max-w-[20rem] p-0.5 rounded-sm border border-black text-black" />
    </div>
  );
};

export default Input;