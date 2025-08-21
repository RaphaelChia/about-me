import ContentsSidebar from "@/app/lab/components/contents-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-stretch">
      <ContentsSidebar />
      {children}
    </div>
  );
};

export default Layout;
