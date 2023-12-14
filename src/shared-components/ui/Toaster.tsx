import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '../../lib/svg';
import { hideToaster } from '../../redux/common';

type ToasterProps = {
    messageData: string;
    open: boolean;
};

const Toaster = ({ messageData, open }: ToasterProps): JSX.Element => {
    const dispatch = useDispatch();
    const timer =  6000;
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                dispatch<any>(hideToaster());
            }, timer);
        }
    }, [open]);
    return (
        <>
            {open && (
                <div className={"toaster flex"}>
                    <Icon
                        fill="#fff"
                        type='circle-close'
                        className="mr-2"
                    />
                    <div
                        className="text-xs text-label"
                        dangerouslySetInnerHTML={{
                            __html: `${messageData}`,
                        }}
                    />
                </div>
            )}
            <style jsx>{`
                .toaster {
                    @apply border border-error text-sm text-primary flex items-start py-3 px-6 my-3 mx-auto box-border justify-center;
                    position: fixed;
                    top: 0;
                    left: 50%;
                    transform: translate(-50%, 0);
                    color: white;
                    border-radius: 4px;
                    padding:8px;
                    padding-left:12px;
                    background: #ff6863;
                    animation-name: toaster-animation;
                    animation-duration: ${timer}ms;
                    visibility: hidden;
                    width: 94%;
                    max-width: unset;
                    z-index: 50;
                }
                .toaster.success {
                    background: white;
                    box-shadow: 0 6px 24px 0 rgba(23, 26, 33, 0.16);
                    border: none;
                }
                @media screen and (min-width: 768px) {
                    .toaster {
                        max-width: 400px;
                    }
                }
                @keyframes toaster-animation {
                    0% {
                        visibility: visible;
                        top: 0px;
                    }
                    10% {
                        top: 20px;
                    }
                    90% {
                        top: 20px;
                    }
                    100% {
                        top: 0px;
                        visibility: hidden;
                    }
                }
            `}</style>
        </>
    );
};

export default Toaster;
