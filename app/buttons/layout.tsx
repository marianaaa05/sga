const ButtonsLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen bg-blue-500 ">
      <body>
          {children}
      </body>
    </div>
  );
}

export default ButtonsLayout;