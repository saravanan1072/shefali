import Icon from "../../lib/svg";

const Loader = ({ showLoader }: { showLoader: boolean }) => {
  return (
    <>
      {showLoader && (
        <div className="loading-content">
          <Icon type="loading" />
          <p className="text-xl mt-12 text-center">Please wait...</p>
        </div>
      )}
      <style jsx>{`
        .loading-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </>
  );
};

export default Loader;
