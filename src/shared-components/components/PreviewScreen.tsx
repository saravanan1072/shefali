import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetSubmitClick } from "../../redux/common";
import { RootState } from "../../redux/types";
import Button from "../ui/Button";
import { API_CONFIG } from "../../apis";

export type ActionData = {
  label: string;
  value: string;
};
const PreviewScreen = ({
  heading,
  status,
  formColumn,
  formData,
}: {
  heading: string;
  status?: any;
  formColumn?: number;
  formData: any;
}) => {
  const {
    query: { id },
  } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const commonState: any = useSelector((state: any): RootState => state.common);
  const editDetailsHandler = () => {
    if (commonState.formBtnClicked) {
      dispatch<any>(resetSubmitClick());
    }
    router.push({
      pathname: router.pathname,
      query: {
        id: status?.data,
      },
    });
  };

  const fieldValueHandler = (fieldVal) => {
    if (Array.isArray(fieldVal)) {
      return (
        <ul>
          {fieldVal.map((ele, index) => {
            if (typeof ele === "object") {
              const list =
                Object.keys(ele).length !== 0 &&
                Object.keys(ele).map((val) => {
                  return <li>{ele[val]}</li>;
                });
              const eleList = list && (
                <div className="flex mt-2">
                  <span>{index + 1}. </span>
                  <div>{list}</div>
                </div>
              );
              return eleList;
            } else {
              return <li>{ele}</li>;
            }
          })}
        </ul>
      );
    } else if (typeof fieldVal === "object" && fieldVal.showPreview) {
      let url;
      if (typeof fieldVal.val !== "object") {
        url = `${API_CONFIG.URLS.DOWNLOAD}?fileName=${fieldVal.val}`;
      } else {
        url = URL.createObjectURL(fieldVal.val);
      }

      return (
        <div>
          {fieldVal.val?.name || fieldVal.val}
          {url && (
            <a
              href={url}
              className="text-xs pl-2 underline"
              target="_blank"
              // download={fieldVal.name}
              rel="noopener noreferrer"
            >
              View Document
            </a>
          )}
        </div>
      );
    } else if (typeof fieldVal === "object" && fieldVal.formatRange) {
      if (typeof fieldVal.val === "object") {
        return `${fieldVal.val.min}-${fieldVal.val.max} ${fieldVal.suffix}`;
      } else {
        return fieldVal.val;
      }
    } else {
      return fieldVal;
    }
  };

  const createNewEntry = () => {
    location.replace(location.pathname);
  };

  return (
    <>
      <div className="border rounded-2xl mx-8 mt-20 mb-14 px-8 md:px-14 py-4 main-div">
        <div className="block md:flex justify-between items-center">
          <h3 className="font-bold underline pb-1">{heading}</h3>
          <p className="text-xs mt-2 md:mt-0">
            Status:&nbsp;
            <span
              className={`${
                status?.message ? "text-green-400" : "text-red-600"
              }`}
            >
              {status?.message || "Couldn't perform action due to some error."}
            </span>
          </p>
        </div>
        <div className={`grid form-grid w-full`}>
          {Object.keys(formData).length > 0 &&
            Object.keys(formData).map((data): JSX.Element => {
              return (
                <div key={data} className="mt-4 md:mt-8">
                  <p>{data}</p>
                  <div className={`text-lg value-color`}>
                    {fieldValueHandler(formData[data])}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="block my-4 md:my-0 md:flex justify-end w-full">
          {!id && status?.success && (
            <Button
              type="button"
              size="small"
              onClick={editDetailsHandler}
              variant="secondary"
              className="mr-2"
            >
              Edit Details
            </Button>
          )}
          <Button
            type="button"
            size="small"
            onClick={createNewEntry}
            variant="primary"
            className="mt-2 md:mt-0"
          >
            Add new entry
          </Button>
        </div>
      </div>
      <style jsx>{`
        .main-div {
          box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
        }
        .form-grid {
          grid-template-columns: repeat(${formColumn}, 1fr);
          grid-auto-columns: 50px;
        }
        .value-color {
          color: #3dd6c4;
        }
        .doc-color {
          background: #c4f3ed;
        }
        @media screen and (max-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </>
  );
};

export default PreviewScreen;
