import { categories } from "@/data/data";
import { Tab } from "@headlessui/react";

const Tabbar = () => {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <div className="flex w-full divide-y">
            <Tab.List className="-mb-px flex px-4 space-x-8 ">
                {categories.map((category) => (
                    <Tab
                    
                        key={category.name}
                        className={({ selected }) =>
                            classNames(
                                selected ? 'text-gray-900 border-gray-900' : 'text-gray-400 border-transparent  focus:outline-none',
                                'flex whitespace-nowrap py-4 px-1 border-b-2  text-base font-medium'
                            )
                        }
                    >
                        {category.name}
                    </Tab>
                ))}
            </Tab.List>

        </div>


    );
}

export default Tabbar;