import {memo, useEffect, useMemo, useState} from "react";
import {
    Avatar,
    AvatarImg,
    CommentCreated,
    CommentText,
    CommentWrapper,
    Content,
    LikeBlock,
    LikeCounter,
    LikeIcon,
    UserBlock,
    UserInfo,
    UserName,
    Wrapper,
} from "src/components/Comment/styled";
import {Comments} from "src/components/Comments";
import {useMainStore} from "src/components/Main";
import {getRelativeTime} from "src/lib/date";
import heartRedEmpty from "src/assets/heart/heart-red-empty.svg";
import heartRedFull from "src/assets/heart/heart-red-full.svg";
import {IData} from "src/data/comments";

interface CommentProps {
    comment: IData;
}

export const Comment = memo(({comment}: CommentProps) => {
    const {author, children, created, id, likes, parent, text, userLike} =
        comment;
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");

    const {authors, onUserLikeHandler} = useMainStore();

    useEffect(() => {
        const currentAuthor = authors.find((item) => item.id === author);
        if (currentAuthor) {
            setUserName(currentAuthor.name);
            setUserAvatar(currentAuthor.avatar);
        }
    }, [author, authors]);

    const relativeTime = useMemo(() => {
        return getRelativeTime(new Date(created));
    }, [created]);

    return (
        <Wrapper isChild={!!parent}>
            <CommentWrapper>
                <Avatar>
                    <AvatarImg src={userAvatar} alt="" />
                </Avatar>
                <Content>
                    <UserBlock>
                        <UserInfo>
                            <UserName>{userName}</UserName>
                            <CommentCreated>{relativeTime}</CommentCreated>
                        </UserInfo>
                        <LikeBlock>
                            <LikeIcon
                                onClick={() => onUserLikeHandler(id)}
                                src={userLike ? heartRedFull : heartRedEmpty}
                            />
                            <LikeCounter>{likes}</LikeCounter>
                        </LikeBlock>
                    </UserBlock>
                    <CommentText>{text}</CommentText>
                </Content>
            </CommentWrapper>
            {children && <Comments comments={children} />}
        </Wrapper>
    );
});
