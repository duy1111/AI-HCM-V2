'use client'
import Container from "@/components/container";
import ProductList from "@/components/product-list";
import useImage from "@/hooks/use-images";
import { useEffect } from "react";



const HomePage = () => {
    const list = useImage((state) => state.items)

    return ( 
        <Container>
            <div className="space-y-10 pb-10" >
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8" >
                    <ProductList title="Featured Products" items={list} />
                </div>
            </div>

        </Container>
     );
}
 
export default HomePage;