import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ messages = [] }) {
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">

                {messages
                    // for coping main array
                    .slice()
                    .sort((a, b) => a.timestamp - b.timestamp)
                    ?.map(message => {
                        const { message: lastMessage, sender, id } = message || {};
                        const justify = sender.email !== email ? "start" : "end"
                        const style = sender.email !== email ? "" : "bg-purple-200"
                        return <Message key={id} justify={justify} message={lastMessage} style={style} />
                    })}
            </ul>
        </div>
    );
}
