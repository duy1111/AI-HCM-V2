import { Image } from "@/type";
import NoResults from "./no-results";
import ProductCard from "./ui/product-card";

interface ProductListProps {
    title: string;
    items: Image[];
}

const ProductList: React.FC<ProductListProps> = ({
    items,
    title
}) => {
    return ( 
        <div className="space-y-4" >
            {items.length === 0 && <NoResults/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1" >
                {items.map((item) => (
                    <div key={item.image_path} >
                        <ProductCard data={item} />
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ProductList;