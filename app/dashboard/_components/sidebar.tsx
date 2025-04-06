import Logo from "./logo";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
       <Logo />
    </div>
     <div className="flex flex-col w-full">
     </div>
    </div>
  );
};

export default Sidebar;