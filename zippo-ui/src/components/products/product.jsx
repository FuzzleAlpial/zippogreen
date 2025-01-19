export default function Product(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick()
    }
  }
  
  return (
    <div className="product" onClick={handleClick}>
      <img src={props.image} alt="Zippo image" />
      <div>{props.id} - {props.name}</div>
      <hr />
      <span>{props.price.toLocaleString()}đ</span>
    </div>
  );
}

