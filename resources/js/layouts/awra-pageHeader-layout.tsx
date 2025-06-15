import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      {/* Encabezado */}
      <div className="bg-gray-900 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      {/* Barra horizontal */}
      <div className="bg-gray-500 border-b border-gray-700 py-4">
        <h2 className="text-center text-xl font-semibold text-white">{subtitle}</h2>
      </div>
    </>
  );
};

export default PageHeader;