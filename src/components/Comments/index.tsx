import {memo} from "react";
import {Comment} from "src/components/Comment";
import {IData} from "src/data/comments";

interface CommentsProps {
    comments: IData[];
}

export const Comments = memo(({comments}: CommentsProps) => {
    return (
        <div>
            {comments?.map((item) => {
                return <Comment comment={item} key={item.id} />;
            })}
        </div>
    );
});
