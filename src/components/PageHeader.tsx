interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title = "Without Title" }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 border-b px-6 py-4">
        {title}
      </h2>
    </div>
  );
};

export default PageHeader;
