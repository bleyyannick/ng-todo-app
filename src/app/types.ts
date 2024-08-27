export interface Task {
    id: number;
    description: string;
    status: TaskStatus;

}

export enum TaskStatus {
    Active = "active",
    Completed = "completed",
    Todo = "todo"
}




