import dynamic from "next/dynamic";

const categories = [
  { id: 0, name: "followers" },
  { id: 1, name: "following" },
];

const FollowersContainer = dynamic(
  () => import("@/components/containers/FavoritesContainer"),
  {
    ssr: false,
  }
);

const Tabs = dynamic(() => import("@/components/modules/profile/Tabs"), {
  ssr: false,
});

const FollowersLayout = () => {
  return (
    <div className="top-0 flex min-h-screen w-full flex-col justify-items-start gap-4 p-3 px-3 md:mx-auto lg:w-[36rem] lg:px-0 lg:pr-5">
      <Tabs profilePage={false} categories={categories} />
      <FollowersContainer />
    </div>
  );
};

export default FollowersLayout;
