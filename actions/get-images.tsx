import {  Image } from "@/type";
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/text-search`

export interface Query {
    text_search_1?: string;
    text_search_2?:string;
    alpha?: number | undefined;
    k?: number
}


const getImageWithTextSearch = async (query: Query): Promise<Image[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            query1:query.text_search_1,
            query2:query.text_search_2,
            alpha:query.alpha,
            c:query.k
        }
    })
    const res = await fetch(url);
    return res.json()
}

export default getImageWithTextSearch;