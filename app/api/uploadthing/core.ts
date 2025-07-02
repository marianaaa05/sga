import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth =  async () => {
  const { userId } = await auth();
  if(!userId) throw new Error("Unauthorized: No user is authenticated");
  return { userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  courseImage: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(handleAuth)
    .onUploadComplete(() => {
      console.log("file uploaded");
    }),

    courseAttachment: f(["text", "image", "audio", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {
      console.log("file uploaded");
    }),
  } satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
