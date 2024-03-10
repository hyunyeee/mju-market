import SelectCategory from '../components/UI/market/SelectCategory';
import ProductListItem from '../components/UI/market/ProductListItem';

const Market: React.FC = () => {
  return (
    <div>
      <SelectCategory />
      <ProductListItem />
    </div>
  );
};

export default Market;
