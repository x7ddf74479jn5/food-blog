type Props = {
  label: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ label, children }) => {
  const base = "inline-block absolute bg-gray-500 left-1/2 rounded-sm transform -translate-x-1/2 whitespace-nowrap";
  const hoverTransition = "opacity-0 invisible group-hover:visible group-hover:opacity-100 transition ease-in";

  return (
    <div className="group inline-block relative cursor-pointer">
      {children}
      {/* triangle */}
      <div className={`${base} ${hoverTransition} -bottom-4 h-3 w-3 rotate-45`} />
      <div className={`${base} ${hoverTransition} -bottom-8 p-1 text-xs leading-snug}`}>{label}</div>
    </div>
  );
};

export default Tooltip;
