import useSWR, { useSWRInfinite } from 'swr';
import { SearchFriend } from '../api/api-user';

export function useInfiniteScroll(url: string, token: string) {
    if(!url) throw new Error('url must be required');

    const { data, error, isValidating, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
        if(previousPageData && !previousPageData.length) return null; // reached the end
        return [url + `page=${pageIndex}`, token];
    }, SearchFriend);

    const filteredData = data ? [].concat(...data) : []
    const isReachingEnd = data && data[data.length - 1].length < 10
    return { 
        filteredData, 
        error, 
        isValidating, 
        isReachingEnd,
        size, 
        setSize 
    }
}