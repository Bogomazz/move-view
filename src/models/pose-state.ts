export interface PoseState {
    img: string;
    order: number;
    status: 'blocked' | 'inprogress' | 'done'
}