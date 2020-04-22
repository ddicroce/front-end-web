export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    job: string;
    workFromHomedat: string;
    salary: number;
    getInfo() {
        return `${this.firstName} ${this.lastName} makes ${this.salary}`;
    }
}
