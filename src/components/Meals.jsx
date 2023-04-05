import { useAppContext } from '../context';

const Meals = () => {
  const context = useAppContext();
  console.log(context);
  return <div>Meals</div>;
};

export default Meals;
