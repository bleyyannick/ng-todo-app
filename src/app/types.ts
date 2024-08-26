export interface Task {
    id: number;
    description: string;
    status: TaskStatus;

}

enum TaskStatus {
    Active = "active",
    Completed = "completed",
    Todo = "todo"
}




