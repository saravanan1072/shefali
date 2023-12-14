import Icon from "../../lib/svg";

const DashboardNotFound = () => {
  return (
    <div>
      <Icon type="dataNotFound" width="70%" height="80%" className="mx-auto" />
      <h3 className="big-text">Whoops...</h3>
      <p className="text-xl text-center">No results were found.</p>
      <style jsx>{`
        .big-text {
          font-size: 40px;
          color: #3dd6c4;
          text-align:center;
        }
      `}</style>
    </div>
  );
};

export default DashboardNotFound;
