import { Dialog, Transition } from "@headlessui/react";
import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { createCampaign, fetchAllCampaign } from "@/services/services";
import { ICampaign } from "@/interface.ts/campaign.interface";
import documentIcon from "@/public/svg/Document.svg"
import Image from "next/image";

interface Modal {
    isOpen: boolean,
    closeModal: () => void,
    // item: Item,
}

const addTags = (e: any) => {




}

const removeTags = (indexToRemve: any) => {
    // setTagName(tagName.filter((_, index) => index != indexToRemve))
}


const CreateCampaignModal = ({ isOpen, closeModal, }: Modal) => {

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
   


    const myFun = async (d: any) => {
        // alert(d.title + "from" + d.description + "to" + d.target)
       

        const results = await createCampaign(d)
        console.log(results);
        closeModal()
        reset();

    }



    return (
        <>
            <Transition appear show={isOpen ?? false} as={Fragment} >
                <Dialog as="div" className="relative z-10 " onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto ">
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
                                <Dialog.Panel className="bg-white w-full max-w-md transform overflow-hidden rounded-md bg-grayblack p-6 text-left align-middle shadow-xl transition-all space-y-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg  leading-6  py-4 font-bold flex flex-row items-center space-x-2 justify-start"
                                    >
                                        {/* <DocumentTextIcon className="h-4 w-4 text-gray-900" /> */}

                                        <Image alt="campaign" src={documentIcon}   objectFit="cover" layout="contain" className="bg-gray-900  " />
                                        <div className="text-gray-900"> Create a campaign</div>

                                    </Dialog.Title>
                                    {/* Search */}

                                    {/* <SearchBar /> */}

                                    <div className=" overflow-auto space-y-4">


                                        <form onSubmit={handleSubmit(myFun)} className="w-full max-w-sm">
                                            <div className="md:flex md:items-center mb-6">

                                                <div className="w-full space-y-1">
                                                    <label className="text-gray-900   text-sm" htmlFor="title">Campaign Title</label>
                                                    <Input crossOrigin={undefined} {...register('title', { required: true })} className="border  form-control  bg-mattblack p-2 text-gray-900 focus:outline-none rounded w-full py-2 px-4 leading-tight "
                                                        placeholder="Write your camaign title here"
                                                        id="title"
                                                        type="text" />
                                                    {errors.title && errors.title.type == "required" && <p className="text-red-400 text-sm">Please enter a title</p>}
                                                </div>
                                            </div>








                                            <div className="md:flex md:items-center mb-6 form-group">

                                                <div className=" w-full space-y-1">
                                                    <label className="text-gray-800" htmlFor="description">
                                                        Description
                                                    </label>
                                                    <Textarea  {...register('description', { required: true, minLength: 3 })} className="form-control  bg-mattblack p-2 text-gray-900 focus:outline-none rounded w-full py-2 px-4 leading-tight" placeholder="Write a a message here" id="description" rows={10} />
                                                    {errors.description && errors.description.type == "required" && <p className="text-red-400  text-sm">please enter message description</p>}
                                                    {errors.description && errors.description.type == "minLength" && <p className="text-red-400  text-sm">please enter  a minimum of 3 letters</p>}

                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 mb-6">
                                                <label htmlFor="" className="block text-sm font-medium text-gray-800">
                                                    Target group
                                                </label>
                                                <Controller

                                                    name="target"
                                                    control={control}
                                                    defaultValue="select you target group" // Set the initial value here

                                                    render={({ field }) => (
                                                        <select
                                                            {...field}
                                                            // animate={undefined}
                                                            // labelProps={undefined}
                                                            // label="Select your target group"
                                                            id="group"
                                                            defaultValue="Select your target group"
                                                            // onChange={formik.handleChange}
                                                            // value={formik.values.campus}
                                                            name="group"
                                                            // required
                                                            // placeholder="Select your target group"
                                                            // {...register('target', { required: true })}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option disabled selected hidden>select you target group </option>
                                                            <option >All customers</option>
                                                            <option >Active customers</option>

                                                        </select>
                                                    )}

                                                />

                                            </div>


                                            <button
                                                type="submit"
                                                className="inline-flex  w-full justify-center rounded-md border border-transparent bg-cyan-900 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-800 focus-visible:ring-offset-2"
                                            // onClick={closeModal}
                                            >
                                                Submit your comment
                                            </button>




                                        </form>



                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    );
}

export default CreateCampaignModal;