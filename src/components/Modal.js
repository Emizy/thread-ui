import React from "react";

export const Modal = ({title, width, setIsOpen, htmlBody}) => {

    return (
        <div>
            <div className={'centered'} data-testid={'modal-container'}>
                <div className={'backdrop'} onClick={() => setIsOpen(false)}/>
                <div className={`${width ? width : 'w-11/12 md:w-1/3'} modal modal-custom__dialog`}>
                    <div className={'modalHeader'}>
                        <div className="flex justify-between items-start sticky-border">
                            <h3 className={`${title ? 'px-6 pt-2' : 'p-2'} text-xl font-semibold text-gray-500`}
                                data-testid={'modal-title'}>
                                {title}
                            </h3>
                            <div className="flex align-items-center">
                                <button className="p-3 leading-none" onClick={() => setIsOpen(false)}
                                        data-testid={'modal-close-btn'}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-7 w-7 bg-gray-500 text-white border-2 rounded-full p-1"
                                         viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-custom__body px-[20px] py-[20px]" data-testid={'modal-body'}>
                        {htmlBody}
                    </div>
                </div>
            </div>
        </div>
    )

}