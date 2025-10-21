import { AxiosError } from "axios";

export interface ErrorType extends AxiosError<{message: string}> {}