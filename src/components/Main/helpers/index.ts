import {IData} from "src/data/comments";

export const nestComments = (commentList: IData[]) => {
    const commentMap: any = {};
    const commentListCopy = structuredClone(commentList);

    commentListCopy.forEach((comment: IData) => {
        return (commentMap[comment.id] = comment);
    });

    commentListCopy.forEach((comment: IData) => {
        if (comment.parent !== null) {
            const parent = commentMap[comment.parent];
            (parent.children = parent.children || []).push(comment);
        }
    });

    return commentListCopy.filter((comment: IData) => {
        return comment.parent === null;
    });
};

export const getNoun = (
    number: number,
    one: string,
    two: string,
    five: string,
) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};
