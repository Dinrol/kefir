import {isMobileDevice} from "src/config/userAgent";
import styled, {css} from "styled-components";

export const MainWrapper = styled.div`
    margin: 0 auto;
    width: 600px;
    padding: 60px 24px;

    ${isMobileDevice
        ? css`
              font-size: 14px;
              padding: 30px 24px;
          `
        : ""}
`;

export const CounterBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 42px;
    position: relative;

    ::after {
        content: "";
        height: 0.5px;
        width: 100%;
        position: absolute;
        bottom: -10px;
        background-color: #767676;
        left: 0;
    }
`;

export const CommentsCount = styled.span`
    font-weight: 700;
`;

export const CommentsLikesBlock = styled.div`
    display: flex;
    align-items: center;
`;
export const CommentsLikesIcon = styled.img`
    margin-right: 8px;
`;
export const CommentsLikesCount = styled.div`
    font-weight: 700;
`;

export const GetMoreButton = styled.button<{disabled?: boolean}>`
    border: none;
    padding: 8px 32px;
    background: #313439;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    display: block;
    margin: 0 auto;
    cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
    border-radius: 4px;
`;
