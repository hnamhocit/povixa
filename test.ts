import { useSignIn } from "@clerk/nextjs";
type SignInRet = ReturnType<typeof useSignIn>;
// @ts-expect-error
const x: SignInRet = 1;
