export interface ApiResponse {
    ok: boolean;
    message: string;
    data?: any; // Usa un tipo más específico si conoces la estructura de `data`
}