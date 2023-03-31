import { useState } from "react";
import isValidEmail from "../../utils/isValidEmail";
import { useGetUserQuery } from "../../features/user/userApi";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    // handle local state
    const [message, setMessage] = useState("");
    const [to, setTo] = useState("");
    const [userCheck, setUserCheck] = useState(false);

    // get user data by hook
    const { data: participant } = useGetUserQuery(to, {
        skip: !userCheck,
    });

    // debounce handler 
    const debounceHandle = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    };

    // check is email is valid
    const doSearch = (value) => {
        // if email is valid set it in local state
        if (isValidEmail(value)) {
            setUserCheck(true)
            setTo(value);
            console.log(participant);
        }
    };

    // handle user input email handler
    const handleSearch = debounceHandle(doSearch, 500);


    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>

                    {/* modal form  */}
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">

                            {/* to input */}
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    onChange={(e) => { handleSearch(e.target.value) }}
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                />
                            </div>

                            {/* message input box */}
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                />
                            </div>
                        </div>

                        {/* submit button */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Send Message
                            </button>
                        </div>

                        {participant.length === 0 && <Error>This user doesn't exist!</Error>}
                    </form>
                </div>
            </>
        )
    );
}
