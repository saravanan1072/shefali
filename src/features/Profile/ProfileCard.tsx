import React from "react";
import Button from "../../shared-components/ui/Button";
import { API_CONFIG } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import { hidePopup, showPopup } from "../../redux/common";
import Resources from "../Resources/Resources";
import { deleteResourceData, fetchResourceData } from "../../redux/resources";

const ProfileCard = ({
  resourceId,
  resourceName,
  experience,
  costing,
  technology,
  vendor,
  manager,
  resume,
  setUpdateData
}: {
  resourceId: string;
  resourceName: string;
  experience: number;
  costing: string;
  technology: string[];
  vendor: string;
  manager: any;
  resume: any;
  setUpdateData?:any
}) => {
  const url = `${API_CONFIG.URLS.DOWNLOAD}?fileName=${encodeURIComponent(resume)}`;
  const { resourceArray }: any = useSelector(
    (state: any): RootState => state.resource
  );
  const dispatch = useDispatch();

  const updateHandler = () => {
    const selectedResource = resourceArray.find(
      (resource) => resource._id === resourceId
    );
    const selectedData={...selectedResource,vendor:selectedResource.vendor.companyName};
    dispatch<any>(
      showPopup({
        title: "",
        description: <Resources resourceClassName="my-8" prefilledVals={selectedData} setUpdateData={setUpdateData}/>,
        btnArray: [],
      })
    );
  };

  const deleteHandler = async () => {
    dispatch<any>(
      showPopup({
        title: "",
        description: "Are you sure you want to delete this resource?",
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
            onClick: async() => {
              await dispatch<any>(deleteResourceData({ data: { id: resourceId } }));
              dispatch<any>(fetchResourceData());
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
      <div className="flex justify-between items-center bg-white py-3 pl-8 pr-4 mt-5 card">
        <div className="w-7/12">
          {resourceName ? <h3 className="name">{resourceName}</h3> : ""}
          <div>
            <div className="block md:flex mt-3 justify-between">
              {experience ? (
                <p className="size">Experience: {experience} years</p>
              ) : (
                ""
              )}
              {costing ? <p className="size mt-1 md:mt-0">Budget: ₹{costing}</p> : ""}
            </div>
            <div className="block md:flex justify-between mt-1">
              {vendor ? <p className="size">Partner: {vendor}</p> : ""}
              {manager ? (
                <p className="size mt-1 md:mt-0">
                  Team Member:
                  {manager?.map((member, index) => (
                    <span key={index}>
                      {index === manager.length - 1 ? (
                        <>{member.name}</>
                      ) : (
                        <>{member.name},</>
                      )}
                    </span>
                  ))}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex mt-1">
              {technology && (
                <p className="size">
                  Technologies:
                  {technology?.map((tech, index) => (
                    <span key={index}>
                      {index === technology.length - 1 ? (
                        <>{tech}</>
                      ) : (
                        <>{tech},</>
                      )}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>

          <a href={url} download={resume} target="_blank">
            <Button
              type="button"
              size="small"
              children="Download resume"
              variant="secondary"
            />
          </a>
          <Button
            type="button"
            size="small"
            children="Update resource"
            className="mx-auto mt-1"
            onClick={updateHandler}
          />
          <Button
            type="button"
            size="small"
            variant="secondary"
            children="Delete resource"
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
          font-size: 10px;
        }
      `}</style>
    </>
  );
};

export default ProfileCard;
