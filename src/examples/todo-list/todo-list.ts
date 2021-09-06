import Component from "../../string-work/component";
import { TodoItem } from "./todo-item";

type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

type State = {
    todos: Todo[];
    loading: boolean;
};

export default class TodoList extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: null,
            loading: true,
        };
    }

    async componentDidMount() {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/"
        );
        const json = await response.json();
        this.setState({ loading: false, todos: json });
    }

    render() {
        if (this.state.loading) {
            return `
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading Todos...</span>
              </div>
            </div>
            `;
        }

        return this.state.todos
            .map((todo) => {
                return TodoItem({
                    title: todo.title,
                    completed: todo.completed,
                });
            })
            .join("");
    }
}
