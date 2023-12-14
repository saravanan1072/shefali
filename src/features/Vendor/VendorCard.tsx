import React from "react";
import Button from "../../shared-components/ui/Button";
import { useDispatch } from "react-redux";
import { hidePopup, showPopup } from "../../redux/common";

const VendorCard = ({
  Id,
  vendorName,
  dataArr,
  location,
  expertise,
  contactDetails,
  accountManager,
  experience,
  paymentTerms,
  budget,
  workLocation,
  openPositions,
  contractDuration,
  btnArray,
  deleteHandlerFn,
  fetchHandlerFn,
  updateHandlerFn,
}: {
  Id: string;
  vendorName: string;
  dataArr?: any;
  location?: string;
  expertise?: string[];
  contactDetails: any[];
  accountManager?: any[];
  experience?: string;
  setUpdateData?: any;
  paymentTerms?: string;
  budget?: string;
  workLocation?: string;
  openPositions?: string;
  contractDuration?: string;
  btnArray?: Array<string>;
  deleteHandlerFn?: (...args: unknown[]) => unknown;
  fetchHandlerFn?: (...args: unknown[]) => unknown;
  updateHandlerFn?: (...args: unknown[]) => unknown;
}) => {
  const dispatch = useDispatch();

  const updateHandler = () => {
    const selected = dataArr.find((el) => el._id === Id);
    const managerArr = [];
    let selectedData;
    if (selected?.accountManager) {
      selected?.accountManager.map((ele, index) => {
        managerArr[index] = { name: ele.managerID?.name };
      });
      selectedData = { ...selected, accountManager: managerArr };
    } else {
      selectedData = selected;
    }
    updateHandlerFn(selectedData);
  };

  const deleteHandler = async () => {
    dispatch<any>(
      showPopup({
        title: "",
        description: "Are you sure you want to delete this vendor?",
        btnArray: [
          {
            variant: "secondary",
            onClick: () => {
              dispatch<any>(hidePopup());
              return;
            },
            children: "Cancel",
          },
          {
            variant: "primary",
            onClick: async () => {
              await dispatch<any>(deleteHandlerFn({ data: { id: Id } }));
              dispatch<any>(fetchHandlerFn());
              dispatch<any>(hidePopup());
            },
            children: "Delete",
          },
        ],
      })
    );
  };

  return (
    <>
      <div className="block md:flex justify-between items-center bg-white py-3 pl-4 md:pl-8 pr-4 mt-5 card">
        <div className="w-full md:w-1/2">
          {vendorName ? <h3 className="name">{vendorName}</h3> : ""}
          <div className="mt-3 block md:flex justify-between">
            {location ? <p className="size">Location: {location}</p> : ""}
            {expertise?.length > 0 ? (
              <p className="size">
                Expertise:
                {expertise?.map((tech, index) => (
                  <span key={index}>
                    {index === expertise.length - 1 ? (
                      <>{tech}</>
                    ) : (
                      <>{tech},</>
                    )}
                  </span>
                ))}
              </p>
            ) : (
              ""
            )}
            {experience ? <p className="size">Experience: {experience}</p> : ""}
            {paymentTerms?.length > 0 ? (
              <p className="size">Payment Terms: {paymentTerms}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between">
            {budget ? <p className="size">Budget: ₹{budget}</p> : ""}
            {workLocation ? (
              <p className="size">Work Location: {workLocation}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between">
            {openPositions ? (
              <p className="size">Open Positions: {openPositions}</p>
            ) : (
              ""
            )}
            {contractDuration ? (
              <p className="size">Contract Duration: {contractDuration}</p>
            ) : (
              ""
            )}
          </div>
          {contactDetails ? (
            <div className="size flex">
              Contact Details:&nbsp;
              <div>
                {contactDetails?.map((contact, index) => {
                  return (
                    <div className="flex mb-2">
                      <span>{index + 1}.&nbsp;</span>
                      <div>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                        {contact.phoneNumber !== 0 && (
                          <p>{contact.phoneNumber}</p>
                        )}
                        <p>{contact.designation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          {accountManager && (
            <p className="size">
              Account Manager(s):&nbsp;
              {accountManager?.map((manager, index) => (
                <span key={index}>
                  {index === accountManager.length - 1
                    ? manager.managerID && <>{manager.managerID?.name}</>
                    : manager.managerID && <>{manager.managerID?.name},</>}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            type="button"
            size="small"
            children={btnArray[0]}
            className="mx-auto"
            onClick={updateHandler}
          />
          <Button
            type="button"
            size="small"
            variant="secondary"
            children={btnArray[1]}
            className="mx-auto mt-1"
            onClick={deleteHandler}
          />
        </div>
      </div>
      <style jsx>{`
        .card {
          box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
          border-radius: 15px;
        }
        .name {
          font-size: 24px;
        }
        .size {
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default VendorCard;
