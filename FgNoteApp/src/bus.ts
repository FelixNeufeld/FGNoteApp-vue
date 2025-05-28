import mitt from "mitt";

export type Events = {
    characterSelected: string;
    moveInputCancelled: void;
}

export const bus = mitt<Events>();