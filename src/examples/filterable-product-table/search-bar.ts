import Component from "../../string-work/component";

export default class SearchBar extends Component {
    constructor(props: any) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(text: string) {
        this.props.onFilterTextChange(text);
    }

    handleInStockChange(checked: boolean) {
        this.props.onInStockChange(checked);
    }

    render() {
        return `
        <form>
        <input
          type="text"
          placeholder="Search..."
          value="${this.props.filterText}"
          oninput="${this.self}.handleFilterTextChange(this.value)"
        />
        <p>
          <input
            type="checkbox"
            ${this.props.inStockOnly ? "checked" : null}
            oninput="${this.self}.handleInStockChange(this.checked)"
          />
          Only show products in stock
        </p>
      </form>
        `;
    }
}
