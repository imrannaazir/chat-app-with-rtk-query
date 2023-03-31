export default function Message({ justify, message, style }) {
    return (
        <li className={`flex justify-${justify}`}>
            <div className={`relative max-w-xl px-4 py-2 text-gray-700  rounded shadow ${style}`}>
                <span className="block">{message}</span>
            </div>
        </li>
    );
}
