import {useState} from "react";

import {useQuery} from "@tanstack/react-query";

import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {queryKey} from "src/config/queryKey";
import {IData, IPagination} from "src/data/comments";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {IAuthor} from "src/data/authors";

export const useComments = () => {
    const [comments, setComments] = useState<IData[]>([]);
    const [pagination, setPagination] = useState<IPagination["pagination"]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [commentsCount, setCommentsCount] = useState(0);
    const [likesCount, setLikesCount] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const calcLikes = (comments: IData[]) => {
        return comments.reduce((acc: number, el: IData) => {
            acc += el.likes;
            return acc;
        }, 0);
    };

    const onUserLikeHandler = (id: number) => {
        let result = comments.find((item) => item.id === id);

        if (result) {
            if (result.userLike) {
                result.likes--;
                result.userLike = false;
                setLikesCount(calcLikes(comments));
                return;
            }
            result.likes++;
            result.userLike = true;
        }
        setLikesCount(calcLikes(comments));
    };

    const fetchMoreComments = () => {
        refetch();
    };

    const {refetch, isFetching} = useQuery({
        queryFn: async () => {
            const response: IPagination = await getCommentsRequest(currentPage);

            if (response) {
                setComments((prev) => [...prev, ...response.data]);
                setLikesCount((prev) => (prev += calcLikes(response.data)));
                setPagination(response.pagination);
                setCommentsCount((prev) => (prev += response.data.length));
                setCurrentPage((prev) => prev + 1);

                if (currentPage >= response.pagination.total_pages) {
                    setIsLastPage(true);
                }
            }
            return response;
        },
        queryKey: [queryKey.Comments],
        staleTime: Infinity,
        cacheTime: Infinity,
        enabled: pagination && currentPage <= pagination.total_pages,
    });

    useQuery({
        queryFn: async () => {
            const response: IAuthor[] = await getAuthorsRequest();
            if (response) {
                setAuthors(response);
            }
            return response;
        },
        queryKey: [queryKey.Authors],
    });

    return {
        comments,
        pagination,
        authors,
        likesCount,
        commentsCount,
        calcLikes,
        onUserLikeHandler,
        fetchMoreComments,
        isFetching,
        isLastPage,
    };
};
