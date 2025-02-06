interface BtnProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  ClassName?: string;
  children: React.ReactNode;
}
function Btn({ ClassName, children, ...rest }: BtnProps) {
  return (
    <div className={`${ClassName} rounded-lg text-center`} {...rest}>
      {children}
    </div>
  );
}

export default Btn;
