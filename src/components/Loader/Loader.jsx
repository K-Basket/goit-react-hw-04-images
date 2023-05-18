import { ThreeDots } from 'react-loader-spinner';

export function Loader() {
  return (
    <ThreeDots
      height="50"
      width="50"
      radius="9"
      color="gray"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
}

// export function Loader() {
//   return <p>loading...</p>;
// }
