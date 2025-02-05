import PropTypes from 'prop-types';

const PageWrapper = ({ children }) => {
  return (
    <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#ede9fe_1px,transparent_1px),linear-gradient(to_bottom,#f3e8ff_1px,transparent_1px)] bg-[size:14px_24px] print:bg-transparent print:bg-none">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 pointer-events-none print:hidden">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-violet-500 via-purple-400 to-indigo-500"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"></div>
      </div>

      {children}
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
