import { UserButton } from "@clerk/nextjs";
const Home = () => {
  return (
    <div>
      <UserButton />
      <p>Dashboard</p>
    </div>
  )
}
export default Home;