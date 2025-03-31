import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}>
      <Image
        src={loader}
        alt='Loading...'
        width={100}
        height={100}
        className='mx-auto'
      />
    </div>
  );
};

export default LoadingPage;
