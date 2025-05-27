import mitt from "mitt";

export type Events = Record<'characterSelected', string>

export const bus = mitt<Events>();