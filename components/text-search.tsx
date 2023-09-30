import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TextSearch = async() => {
    
  return (
    <>
      <div className="flex flex-col py-2 gap-2 w-2/6">
        <Input type="text" placeholder="text search 1" />
        <Input type="text" placeholder="text search 2" />
      </div>
      <div className="flex flex-col justify-center py-2 gap-2 w-1/12">
        <Button className="h-full">Search</Button>
      </div>
    </>
  );
};

export default TextSearch;
