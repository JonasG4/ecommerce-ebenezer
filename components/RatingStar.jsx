import { ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { StarHalfIcon } from "./icons/regular";

export default function RatingStar({ rating, quantity }) {
    return (
        <div className="w-full flex gap-2">
            <div className="flex gap-1 flex-shrink-0">
                {[1, 2, 3, 4, 5].map(star => (
                    <StarHalfIcon
                        key={star}
                        className={`w-4 ${rating >= (star - 0.5) ? 'text-yellow-500' : 'text-gray-300'} ${rating >= star ? " fill-yellow-500 text-yellow-500" : "fill-gray-300 "}`} />
                ))}
                {/* 5 >= 5 */}
                {/* 5 >= 5.5 */}
            </div>
            <article className="text-gray-500 text-sm flex-shrink-0 whitespace-nowrap">
                <ChatBubbleBottomCenterTextIcon title="Comentarios" className="w-4 inline-block" />
                <span className="ml-1">{quantity}</span>
            </article>
        </div>
    )
}