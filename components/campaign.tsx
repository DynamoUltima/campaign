import { Tab } from "@headlessui/react";

import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { TABLE_HEAD, TABLE_ROWS } from "@/data/data";
import CreateCampaignModal from "./modals/createCampaignModal";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCampaign, fetchPaginatedCampaign } from "@/services/services";
import { ICampaign } from "@/interface.ts/campaign.interface";
import documentIcon from "@/public/svg/Document.svg"
import Image from "next/image";








const Campaign = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0);
    const [query, setQuery] = useState('');

    async function fetchData() {

        const results = await fetchPaginatedCampaign(page, query);

        console.log('data', results)

        return results

    }

    // const  getData=async()=>{

    //     return  await fetchPaginatedCampaign(page)

    // }

    //getCampaign

    const { data, isError, isLoading, error, isSuccess, refetch } = useQuery(["getPageCampaign"], fetchData, { keepPreviousData: false, });
    // refetchInterval:50000 
    console.log('camp', data)
    const campaignList: Array<ICampaign> = data?.campaign;

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    function handlePrevious() {
        setPage((p) => {
            if (p === 1) return p

            return p - 1;
        })

    }

    function handleNext() {
        setPage((p) => {

            if (p === pageCount) return p

            return p + 1;


        })


    }

    useEffect(() => {
        if (data) {
            setPageCount(data.pagination.pageCount)
            refetch()
        }

        



    }, [data, page,])


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // setSearchTerm(event.target.value);
        // event.preventDefault();

        if(event.target.value.length ===0){
            refetch();
        }

        setQuery(event.target.value)

        
       
    };

    const handleSubmit = (event :any) => {
        event.preventDefault();
        refetch()
        // Handle the search here (e.g., make an API request)
        console.log('Search submitted:', query);
      };









    return (
        <Tab.Panel className="relative  flex flex-col w-full h-full space-y-4">

            <div className="flex flex-row justify-between w-full shrink-0 gap-2 ">
                <form onSubmit={handleSubmit} className="flex  space-x-4">
                    
                        <Input

                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined}
                            className="bg-white  focus:border-cyan-900"
                            onChange={handleInputChange}
                        />

                        <Button type="submit" variant="outlined" className="capitalize !border border-[#004741] bg-white  rounded-lg !flex !items-center justify-center text-cyan-900 !px-8">
                            search
                        </Button>
                        {/* <button  onClick={()=>{}} className="border border-cyan-900  rounded-lg flex items-center text-cyan-900 p-2">
                        Search
                    </button> */}

                    
                </form>

                <Button onClick={openModal} className="flex items-center capitalize gap-3 bg-cyan-900" size="sm">
                    {/* <DocumentTextIcon strokeWidth={2} className="h-4 w-4" /> */}
                    <Image alt="document" src={documentIcon} objectFit="cover" layout="contain" />
                     create campaingn
                </Button>
            </div>

            <CreateCampaignModal isOpen={isOpen} closeModal={closeModal} />


            <Card className="h-full w-full drop-shadow-sm  rounded-lg">



                <CardBody className="overflow-scroll px-0 py-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b   border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            // color="blue-gray"
                                            className=" font-bold leading-none text-gray-900"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {campaignList?.map(
                                (
                                    {

                                        title: title,
                                        description: description,
                                        target: target,
                                        status,

                                    },
                                    index,
                                ) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">

                                                    <Typography
                                                        variant="small"
                                                        // color=""
                                                        className="font-normal text-ellipsis overflow-hidden"
                                                    >
                                                        {title}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-ellipsis overflow-hidden"
                                                >
                                                    {description}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-ellipsis overflow-hidden"
                                                >
                                                    {target}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal text-ellipsis overflow-hidden"
                                                    >
                                                        {status}

                                                    </Typography>


                                                </div>
                                            </td>

                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>

            </Card>
            <CardFooter className="flex  itemster-center justify-end border-t space-x-4 overflow-auto  border-blue-gray-50 p-4">
                <Button disabled={page === 1} onClick={handlePrevious} variant="text" size="sm" className="rounded-full">
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-cyan-900" />
                </Button>
                <div className="flex items-center gap-2 ">
                    {Array(pageCount).fill(null).map((_, index) => {
                        return <IconButton onClick={() => setPage(index + 1)} key={index} variant={"text"} size="sm" className={`${page == index + 1 ? 'rounded-full bg-cyan-900 text-white' : 'rounded-full'}  `}>
                            {index + 1}
                        </IconButton>
                    })
                    }

                    {/* <IconButton variant="text" size="sm" className="rounded-full">
                        2
                    </IconButton> */}
                    {/* <IconButton variant="text" size="sm">
                        page:{page}
                    </IconButton> */}
                    {/* <IconButton variant="text" size="sm" className="rounded-full ">
                        ...
                    </IconButton> */}
                    {/* <IconButton variant="text" size="sm">
                            8
                        </IconButton> */}
                    {/* <IconButton variant="text" size="sm" className="rounded-full">
                        9
                    </IconButton>
                    
                    <IconButton variant="text" size="sm" className="rounded-full">
                    { Array(pageCount).fill(null).length}
                    </IconButton> */}
                </div>
                <Button disabled={page === pageCount} onClick={handleNext} variant="text" size="sm">
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-cyan-900" />
                </Button>
            </CardFooter>
        </Tab.Panel>

    );
}

export default Campaign;