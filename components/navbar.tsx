"use client";
import { useState } from "react";
import Container from "./container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import getImageWithTextSearch, { Query } from "@/actions/get-images";
import useImage from "@/hooks/use-images";
import { Slider } from "@/components/ui/slider";
import toast from "react-hot-toast";
import { Result } from "postcss";
import useBack from "@/hooks/use-back-store";

const Navbar: React.FC<any> = () => {
  const [searchData, setSearchData] = useState<Query>({
    text_search_1: "",
    text_search_2: "",
    alpha: 0.5,
    k: 5
  });

  const [objectDetection, setObjectDetection] = useState<{ object: string }>({
    object: "",
  });

  const [ocrSearch, setOcrSearch] = useState<{ query: string }>({
    query: "",
  });

  const useback = useBack();
  const useImages = useImage();
  const handleTextSearch = async () => {
    try {
      const response = await getImageWithTextSearch(searchData);
      if (response) {
        useback.addItem({
          query: searchData,
          data: response,
          url: "text-search",
          method: "GET",
        });
        useImages.removeAll();
        useImages.addItem(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/submit`;
    const data = useImages.items;

    try {
      console.log(data)
      const response = await axios.post(URL, data);
      if (response.status === 200) {
        toast.success("Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOcrSearch = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/ocr-search`;

    try {
      const data = useImages.items;

      const response = await axios.post(URL, data, {
        params: ocrSearch,
      });
      if (response.status === 200) {
        useback.addItem({
          query: {
            params: ocrSearch,
          },
          data: response.data,
          url: "ocr-search",
          method: "POST",
        });
        useImages.removeAll();
        useImages.addItem(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleObjectDetection = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/object-detection`;
    try {
      const data = useImages.items;

      // Gửi yêu cầu POST với dữ liệu trong phần thân
      const response = await axios.post(URL, data, {
        params: objectDetection,
      });
      console.log(response);

      if (response.status === 200) {
        useback.addItem({
          query: {
            params: objectDetection,
          },
          data: response.data,
          url: "object-detection",
          method: "POST",
        });
        useImages.removeAll();
        useImages.addItem(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    try {
      let data = useback.removeOne();
      console.log(data);
      useImages.removeAll();
      useImages.addItem(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setSearchData({ ...searchData, alpha: value[0] });
  };

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 h-30 items-center flex gap-3">
          <div className="flex flex-col py-2 gap-2 w-2/6">
            <Input
              value={searchData.text_search_1}
              onChange={(e) =>
                setSearchData({ ...searchData, text_search_1: e.target.value })
              }
              type="text"
              placeholder="text search 1"
            />
            <Input
              value={searchData.text_search_2}
              onChange={(e) =>
                setSearchData({ ...searchData, text_search_2: e.target.value })
              }
              type="text"
              placeholder="text search 2"
            />
          </div>
          <div className="flex flex-col justify-center py-2 gap-2 items-center w-1/6">
            <div className="pl-4 flex-1 w-full h-full flex justify-between items-center ">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <div>0</div>
                  <div>{searchData.alpha}</div>
                  <div>1</div>
                </div>
                <Slider
                  className="w-[150px]"
                  defaultValue={[0.5]}
                  max={1}
                  step={0.01}
                  onValueChange={handleSliderChange}
                />
              </div>
              <Input
                type="number"
                value={searchData.k}
                onChange={(e) =>
                  setSearchData({ ...searchData, k: +e.target.value })
                }
                className="w-20"
              />
            </div>
            <Button onClick={handleTextSearch} className="h-full w-1/2">
              Search
            </Button>
          </div>
          <div className="flex flex-col py-2 gap-2 w-2/6">
            <div className=" w-full flex flex-row gap-1 items-center">
              <Input
                value={objectDetection.object}
                onChange={(e) => setObjectDetection({ object: e.target.value })}
                type="text"
                placeholder="Object detection"
              />
              <Button onClick={handleObjectDetection} size={"sm"}>
                Search
              </Button>
            </div>
            <div className="w-full flex flex-row gap-1 items-center">
              <Input
                value={ocrSearch.query}
                onChange={(e) => setOcrSearch({ query: e.target.value })}
                type="text"
                placeholder="OCR Search"
              />
              <Button onClick={handleOcrSearch} size={"sm"}>
                Search
              </Button>
            </div>
          </div>
          <div className="px-4 h-full gap-2  flex flex-col justify-between">
            <div className="gap-2 w-12">
              <Button size={'sm'} onClick={handleSubmit}>Submit</Button>
            </div>
            <div className="gap-2 w-12">
              <Button size={'sm'} onClick={handleBack}>Back</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
