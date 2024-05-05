export interface UsecaseInterface<InputDTOInterface, OutputDTOInterface> {
    execute(input: InputDTOInterface): Promise<OutputDTOInterface>;
}
