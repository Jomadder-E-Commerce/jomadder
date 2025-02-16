import { TableCell, TableRow } from '@/components/ui/table';
import React, { useState } from 'react';
import ProductCount from './ProductCount';
import { Button } from '@/components/ui/button';

const ProductPorps = ({item}) => {
    const [showProductCount,setShowProductCount] = useState(false)
    const [count,setCount] = useState(0)
    return (
        <TableRow >
        <TableCell className="text-gray-600">
          {item?.props_names}
        </TableCell>
        <TableCell>৳ {item?.sale_price}</TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            <span>{count}</span>
            {showProductCount ? (
              <ProductCount
                count={count}
                setCount={handleCountChange}
                stock={stock}
              />
            ) : (
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                // onClick={handleAddClick}
              >
                Add
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
};

export default ProductPorps;