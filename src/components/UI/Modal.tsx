import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react';

interface IProps {
    isOpen:boolean
    closeModal:()=>void;
    title?:string
     children:ReactNode
}

 const Modal= ({isOpen,closeModal,title,children}:IProps) => {

   
  return (
    <>
     
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border-2 border-white p-6 text-left align-middle shadow-xl transition-all">

                  {title && <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>}

                  <div className="mt-2">
                    <p className="text-sm text-white">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    {children}
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
    </>
  )
}

export default  Modal