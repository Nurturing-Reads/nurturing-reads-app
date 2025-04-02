
export default function Choice({ choice, isRight, isChosen, index, setIsChosen}) {
	
  let color = 'white';
  if (isChosen && isRight) {color = 'green';}
  if (isChosen && !isRight) {color = 'red';}

  const choiceStyle = {
	fontSize: 30,
    color: 'black',
    cursor: 'pointer',
    padding: '8px',
    margin: '8px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    backgroundColor: color,
    transition: 'background-color 0.3s',
    marginRight: '100px'
  };
	
  return (
    <div style={choiceStyle} onClick={e => setIsChosen(index)}>
      {choice} 
    </div>
  );
}
