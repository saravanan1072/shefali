import { HeaderConfig } from '../interfaces/index';

const headerConfig: HeaderConfig = {
    headerStyle: 'flex flex-wrap items-center justify-between bg-white my-4',
    leftDiv: {
        icon: {
            type: 'witarist-logo',
            link: '/resource-dashboard'
        },
    },
    rightDiv: {
        rightDivStyle: 'flex flex-wrap items-center text-sm',
        navbar: {
            "Vendor":[{
                id: 1,
                linkLabel: 'Create Vendor',
                link: "/vendors",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            },{
                id: 2,
                linkLabel: 'Vendor Dashboard',
                link: "/vendor-dashboard",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            },
        ],
        "Resource":[
            {
                id: 1,
                linkLabel: 'Create Resource',
                link: "/resources",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            },
            {
                id: 2,
                linkLabel: 'Resource Dashboard',
                link: "/resource-dashboard",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            }
        ],
        "Client":[
            {
                id: 1,
                linkLabel: 'Create Client',
                link: "/clients",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            },
            {
                id: 2,
                linkLabel: 'Client Dashboard',
                link: "/client-dashboard",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            },
            {
                id: 3,
                linkLabel: 'Create Requirement',
                link: "/client-requirements",
                class:"mt-6 ml-4 md:mt-0 md:ml-0"
            },
            {
                id: 4,
                linkLabel: 'Requirement Dashboard',
                link: "/client-requirement-dashboard",
                class:"mt-6 ml-4 md:mt-0 mr-6 md:ml-0"
            }]
        
           
        },
    },
};

export default headerConfig;
