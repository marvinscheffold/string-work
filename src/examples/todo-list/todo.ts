type Props = {
    title: string;
    completed: boolean;
};

export function Todo(props: Props) {
    let completed = "";
    if (props.completed) {
        completed = `
          <span class="badge bg-primary rounded-pill">Completed</span>
        `;
    }
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        ${props.title}
        ${completed}
    </li>
    
    `;
}
