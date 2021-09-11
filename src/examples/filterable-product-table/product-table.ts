import { Product } from "./filterable-product-table";
import { ProductCategoryRow } from "./product-category-row";
import { ProductRow } from "./product-row";

export function ProductTable(props: any) {
    const filterText = props.filterText.toLowerCase();
    const inStockOnly = props.inStockOnly;

    const rows: string[] = [];
    let lastCategory: string = null;

    props.products.forEach((product: Product) => {
        const productName = product.name.toLowerCase();
        if (productName.indexOf(filterText) === -1) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(
                ProductCategoryRow({
                    category: product.category,
                    key: product.category,
                })
            );
        }
        rows.push(ProductRow({ product: product, key: product.name }));
        lastCategory = product.category;
    });

    return `
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>${rows.join("")}</tbody>
  </table>`;
}
