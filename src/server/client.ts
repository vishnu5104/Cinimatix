// use for communicatiin to client and server throught react query

import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from ".";

export const trpc = createTRPCReact<AppRouter>({});
