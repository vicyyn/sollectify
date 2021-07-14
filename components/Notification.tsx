import { useNotification } from '../utils/context'

const Index = () => {
    const { notify, setNotify } = useNotification()
    return (
            <div role="alert" className={
                notify 
                ? "xl:w-5/12 mx-auto sm:mx-0 sm:w-6/12 md:w-3/5 w-11/12 bg-white shadow-lg rounded flex sm:flex-row flex-col pr-4 absolute left-0 sm:left-auto dark:bg-gray-800 right-0 sm:top-0 sm:mr-6 mt-16 sm:mt-6 mb-6 sm:mb-0 transition duration-150 ease-in-out translate-show"
                : "translate-hide"}>
                <div className="flex flex-col justify-center pl-4 sm:w-9/12 py-3">
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pb-1">Action Completed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-normal pb-2">Yuhuuu! You've got your $11.99 album from The Weeknd.</p>
                    <div className="flex">
                        <span className="text-sm text-green-400 font-bold mr-2 cursor-pointer">View </span>
                        <span className="text-sm pl-2 text-gray-600 dark:text-gray-400 cursor-pointer" onClick={() => setNotify('')}>
                            Dismiss
                        </span>
                    </div>
                </div>
            </div>
    );
};
export default Index;
