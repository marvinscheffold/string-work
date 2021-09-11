import Component from "../../string-work/component";
import { c } from "../../string-work/string-work-dom";
import SearchBar from "./search-bar";
import { ProductTable } from "./product-table";

export type Product = {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
};

const PRODUCTS = [
    {
        category: "Sporting Goods",
        price: "$49.99",
        stocked: true,
        name: "Football",
    },
    {
        category: "Sporting Goods",
        price: "$9.99",
        stocked: true,
        name: "Baseball",
    },
    {
        category: "Sporting Goods",
        price: "$29.99",
        stocked: false,
        name: "Basketball",
    },
    {
        category: "Electronics",
        price: "$99.99",
        stocked: true,
        name: "iPod Touch",
    },
    {
        category: "Electronics",
        price: "$399.99",
        stocked: false,
        name: "iPhone 5",
    },
    {
        category: "Electronics",
        price: "$199.99",
        stocked: true,
        name: "Nexus 7",
    },
];

type State = {
    filterText: string;
    inStockOnly: boolean;
};

export default class FilterableProductTable extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            filterText: "",
            inStockOnly: false,
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText: string) {
        this.setState({
            filterText: filterText,
        });
    }

    handleInStockChange(inStockOnly: boolean) {
        this.setState({
            inStockOnly: inStockOnly,
        });
    }

    render() {
        return `
            <div>
                ${c(SearchBar, {
                    filterText: this.state.filterText,
                    inStockOnly: this.state.inStockOnly,
                    onFilterTextChange: this.handleFilterTextChange,
                    onInStockChange: this.handleInStockChange,
                })}
                ${ProductTable({
                    products: PRODUCTS,
                    filterText: this.state.filterText,
                    inStockOnly: this.state.inStockOnly,
                })}
                
            </div>
        `;
    }
}
