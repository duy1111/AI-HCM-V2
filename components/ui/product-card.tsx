"use client";

import { Image as ImageType } from "@/type";
import Image from "next/image";
import Link from "next/link";

import { MouseEventHandler } from "react";
import { Button } from "./button";
import useImage from "@/hooks/use-images";
import getImageWithSegmentSearch from "@/actions/get-segment";
import getImageWithImageSearch from "@/actions/get-image-search";
import axios from "axios";
import toast from "react-hot-toast";

interface ProductCardProps {
  data: ImageType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const useImages = useImage();
  const handleSegment: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    try {
      const response = await getImageWithSegmentSearch(data.image_path);
      if (response) {
        useImages.removeAll();
        useImages.addItem(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageSearch: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    try {
      const response = await getImageWithImageSearch(data.image_path);
      if (response) {
        toast.success("success!")
        useImages.removeAll();
        useImages.addItem(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/submit-title`;

    try {
      const response = await axios.post(URL,data.title);
      if(response.status === 200){
        toast.success("submit success!")
      }else{
        toast.error("submit failed!")
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-1 space-y4">
      {/* Images and Actions */}
      <div className="rounded-xl bg-gray-100 relative">
        <img
          alt="Image"
          className=" aspect-video object-cover rounded-md"
          src={`${process.env.NEXT_PUBLIC_API_URL}/images?image_path=${data?.image_path}`}
        />
        <div className="opacity-0 group-hover:opacity-100 top-1 transition absolute w-full">
          <div className="flex flex-col gap-1 justify-center">
            <Button title="view" size="sm">
              <Link
                className="w-full"
                href={`${process.env.NEXT_PUBLIC_API_URL}/images?image_path=${data?.image_path}`}
                target="_blank"
              >
                view
              </Link>
            </Button>
            <Button title="segment" size="sm" onClick={handleSegment}>
              segment
            </Button>
            <Button title="image" size="sm" onClick={handleImageSearch}>
              image
            </Button>
            <Button title="image" size="sm" onClick={handleSubmit}>
              submit
            </Button>
          </div>
        </div>
      </div>
      {/*Description  */}
      <div>
        <p className="font-semibold text-lg">{data.title}</p>
      </div>
    </div>
  );
};

export default ProductCard;
