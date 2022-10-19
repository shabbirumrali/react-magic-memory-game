import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
    }
  return (
    <div className="card">
        <div className={flipped ? 'flipped' : ''}>
            <img src={card.img} alt="card front" className='front' />
            <img 
                src='/img/cover.png' 
                alt='Card back'
                className='back'
                onClick={handleClick}
            />
        </div>
    </div>
  )
}

export default SingleCard