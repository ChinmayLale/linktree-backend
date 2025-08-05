declare class ApiResponse {
    private status;
    private message;
    private data;
    private success;
    constructor(status: number, message: string, data: any, success?: boolean);
}
export { ApiResponse };
