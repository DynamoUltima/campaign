import Nav from "./nav";



const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen w-screen bg-gray-100">
            <Nav />
            <div className="flex  justify-center items-center">
                {children}

            </div>


        </div>

    );
}

export default Layout;