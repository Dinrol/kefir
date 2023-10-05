import {isMobileDevice} from "src/config/userAgent";
import {styled} from "styled-components";

export const Wrapper = styled.div<{isChild: boolean}>`
    margin-left: ${({isChild}) =>
        isChild ? `${isMobileDevice ? "20" : "34"}px` : "0px"};
`;

export const CommentWrapper = styled.div`
    display: flex;
    margin-bottom: ${isMobileDevice ? "24px" : "32px"};
`;

export const Avatar = styled.div`
    max-width: ${isMobileDevice ? "40px" : "68px"};
    max-height: ${isMobileDevice ? "40px" : "68px"};
    border-radius: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Content = styled.div`
    width: 100%;
    margin-left: 20px;
`;

export const UserBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12.5px 0;
`;

export const UserName = styled.span`
    font-weight: 700;
    margin-bottom: 5px;
`;

export const CommentCreated = styled.span`
    color: #8297ab;
`;

export const LikeBlock = styled.div`
    display: flex;
    align-items: center;
`;

export const LikeIcon = styled.img`
    margin-right: 8px;
    cursor: pointer;
`;

export const LikeCounter = styled.span`
    font-size: 15px;
    font-weight: 700;
`;

export const CommentText = styled.span`
    word-break: break-all;
`;
