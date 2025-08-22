import ContentsSidebar from '@/app/lab/components/contents-sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-lg:flex-col">
      <ContentsSidebar />
      {children}
    </div>
  );
};

export default Layout;
