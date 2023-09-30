'use client'

import { Image as ImageType } from "@/type";
import Image from "next/image";
import Link from 'next/link'

import { MouseEventHandler } from "react";
import { Button } from "./button";
import useImage from "@/hooks/use-images";
import getImageWithSegmentSearch from "@/actions/get-segment";
import getImageWithImageSearch from "@/actions/get-image-search";
;

interface ProductCardProps {
    data: ImageType
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    const useImages = useImage();
    const handleSegment: MouseEventHandler<HTMLButtonElement>  = async(event) => {
        event.stopPropagation();
        try{
            const response = await getImageWithSegmentSearch(data.image_path)
            if(response){
                useImages.removeAll();
                useImages.addItem(response);
            }
        }catch(error){
            console.error(error);

        }

    }
    const handleImageSearch: MouseEventHandler<HTMLButtonElement>  = async (event) => {
        event.stopPropagation();
        try{
            const response = await getImageWithImageSearch(data.image_path)
            if(response){
                useImages.removeAll();
                useImages.addItem(response);
            }
        }catch(error){
            console.error(error);

        }
    }
    return ( 
        <div className="bg-white group cursor-pointer rounded-xl border p-1 space-y4" >
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative" >
                <Image
                    alt="Image"
                    fill
                    className="aspect-square object-cover rounded-md"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/images?image_path=${data?.image_path}`}
                />
                <div className="opacity-0 group-hover:opacity-100 top-[15%] transition absolute w-full" >
                    <div className="flex flex-col gap-6 justify-center" >
                            <Button
    
                                title="view"
                                size="sm"
                      
                            ><Link className="w-full" href={`${process.env.NEXT_PUBLIC_API_URL}/${data?.image_path}`} target="_blank" >view</Link></Button>
                        <Button
                            title="segment"
                            size="sm"
                            onClick={handleSegment}
                        >segment</Button>
                        <Button
                            title="image"
                            size="sm"
                            onClick={handleImageSearch}
                        >
                            image
                        </Button>
                    </div>
                </div>
            </div> 
             {/*Description  */}
             <div>
                <p className="font-semibold text-lg" >
                    {data.title}
                </p>
             </div>
        </div>
     );
}
 
export default ProductCard;