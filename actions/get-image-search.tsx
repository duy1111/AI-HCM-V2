import useBack from "@/hooks/use-back-store";
import {  Image } from "@/type";
import qs from 'query-string'


const URL = `${process.env.NEXT_PUBLIC_API_URL}/image-search`

export interface Query {
    image_path: string

}


const getImageWithImageSearch = async (image_path:string): Promise<Image[]> => {
   

    const url = qs.stringifyUrl({
        url: URL,
        query: {
            image_path:image_path,
            // text_search_2:query.text_search_2
        }
    })

    const res = await fetch(url);
    return res.json()
}

export default getImageWithImageSearch;