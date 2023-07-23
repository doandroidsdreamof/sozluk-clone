import { Magic } from "magic-sdk";

// Create client-side Magic instance
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

const createMagic = (key: string) =>
  typeof window != "undefined" && new Magic(key);

export const magic = createMagic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string
);
