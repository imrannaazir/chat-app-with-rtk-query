import gravatarUrl from "gravatar-url";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utils/getParterInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
    // get email from store
    const { user } = useSelector(state => state.auth) || {};
    const { email } = user || {};

    // get data from 
    const { data: conversations, isLoading, isError } = useGetConversationsQuery(email);

    // decide what to render
    let content;
    if (isLoading) content = <li><p className="m-2">Loading...</p></li>
    if (!isLoading && isError) content = <li><Error>There is a problem to get conversations!</Error></li>
    if (!isLoading && !isError && conversations?.length === 0) content = <li><p className="m-2">No conversations found!</p></li>
    if (!isLoading && !isError && conversations?.length > 0) content = conversations?.map((conversation) => {
        // destructure properties from each conversation
        const { id: conversationId, message, timestamp, users: partners } = conversation || {};
        // call the util func and get partner info
        const partnerInfo = getPartnerInfo(partners, email);
        // destructure properties from partner info
        const { email: partnerEmail, name: partnerName, } = partnerInfo || {};
        return <Link to={`/inbox/${conversationId}`} key={conversationId}>
            <ChatItem
                avatar={gravatarUrl(partnerEmail, {
                    size: 80
                })}
                name={partnerName}
                lastMessage={message}
                lastTime={moment(timestamp).fromNow()}
            />

        </Link>
    })

    return (
        <ul>
            {content}
        </ul>
    );
}
