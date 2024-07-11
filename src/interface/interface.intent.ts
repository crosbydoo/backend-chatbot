
export interface IntentResponse {
    message: string;
    type_bubble: "bubble" | "dropdown_bubble" | "multi_select_bubble";
    options?: string[];
    datetime?: Date;
    respond_id?: string;
}

export interface Intent {
    tag: string;
    patterns: string[];
    responses: IntentResponse[];
}

export interface LiveIntentResponse {
    message: string;
    type_bubble: string;
}
