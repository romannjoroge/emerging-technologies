import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" h-96 grid justify-center items-center">
      <Oval
        height={40}
        width={40}
        color="#000000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#001"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
