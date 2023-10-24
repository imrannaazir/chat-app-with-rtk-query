// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useEffect, useState } from "react";

export default function ChatBody() {
    const [messages, setMessages] = useState([])
    // get conversation id from params of url
    const { conversationId } = useParams();
    // get messages data from request
    const { data, isLoading, isError } = useGetMessagesQuery(conversationId);

    useEffect(() => { setMessages(data?.data) }, [data?.data])

    console.log(messages);
    // decide what to render
    let content = null;
    if (isLoading) content = <div><p>Loading...</p></div>;
    if (!isLoading && isError) content = <div> <Error>There is an error to get messages!</Error></div>;
    if (!isLoading && !isError && messages?.length === 0) content = <div><p>No messages found!</p></div>;
    if (!isLoading && !isError && messages?.length > 0) content = <div>
        <ChatHead message={messages[0]} />
        <Messages messages={messages} />
        <Options messageInfo={messages[0]} />
        {/* <Blank /> */}
    </div>

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}

            </div>
        </div>
    );
}
