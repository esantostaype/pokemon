export function Progress({ value } : { value: number }) {
    return (
		<div className="pokemon-app__detail__stat__progress-bar">
        	<div className="pokemon-app__detail__stat__progress-bar__value" style={{ transform: `translateX(-${100 - ( value || 0)}% )` }}></div>
		</div>
    )
}