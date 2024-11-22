
export type Priority = 'Muy alta' | 'Alta' | 'Media' | 'Baja'

export interface Ticket {
    code: string;
    id: number;
    issue: string;
    date: string;
    priority: Priority
}