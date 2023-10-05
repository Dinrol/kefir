import {createContext, useContext, useEffect, useMemo, useState} from "react";

import {Comments} from "src/components/Comments";
import {useComments} from "src/components/Main/hooks";
import {
    CommentsCount,
    CommentsLikesBlock,
    CommentsLikesCount,
    CommentsLikesIcon,
    CounterBlock,
    GetMoreButton,
    MainWrapper,
} from "src/components/Main/styled";
import heartGrayEmpty from "src/assets/heart/heart-gray-empty.svg";
import {IData} from "src/data/comments";
import {getNoun, nestComments} from "src/components/Main/helpers";
import {Loader} from "src/components/Loader";

type Context = ReturnType<typeof useComments>;
const MainContext = createContext({} as Context);

export const Main = () => {
    const value = useComments();
    const {
        comments,
        commentsCount,
        likesCount,
        fetchMoreComments,
        isFetching,
        isLastPage,
    } = value;
    const [nestedComments, setNestedComments] = useState<IData[]>([]);

    useEffect(() => {
        if (comments.length) {
            setNestedComments(nestComments(comments));
        }
    }, [comments, likesCount]);

    const noun = useMemo(() => {
        return getNoun(
            commentsCount,
            "комментарий",
            "комментария",
            "комментариев",
        );
    }, [commentsCount]);

    return (
        <MainContext.Provider value={value}>
            <MainWrapper>
                <CounterBlock>
                    <CommentsCount>
                        {commentsCount} {noun}
                    </CommentsCount>
                    <CommentsLikesBlock>
                        <CommentsLikesIcon src={heartGrayEmpty} />
                        <CommentsLikesCount>{likesCount}</CommentsLikesCount>
                    </CommentsLikesBlock>
                </CounterBlock>
                <Comments comments={nestedComments} />
                {comments.length > 0 && !isLastPage && !isFetching && (
                    <GetMoreButton
                        disabled={isFetching}
                        onClick={fetchMoreComments}
                    >
                        Загрузить еще
                    </GetMoreButton>
                )}
                {isFetching && <Loader />}
            </MainWrapper>
        </MainContext.Provider>
    );
};

export const useMainStore = () => useContext(MainContext);
