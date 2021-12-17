export var __esModule: boolean;
export class Instruction {
    static batchSubmit: (arr: any) => Promise<any>;
    constructor(instructions: any, signers: any, feePayer: any, data: any);
    instructions: any;
    signers: any;
    feePayer: any;
    data: any;
    submit: () => Promise<any>;
}
export class Instructions extends Array<any> {
    constructor(arrayLength?: number | undefined);
    constructor(arrayLength: number);
    constructor(...items: any[]);
    echo(): void;
}
