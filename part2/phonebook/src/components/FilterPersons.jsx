import React from 'react'

const FilterPersons = ({person, removeName}) => {
    const {name, number, id} = person
  return (
    <div>
            {name} {number}
            <button onClick={()=>removeName(id, name)}>delete</button>
    </div>
  )
}

export default FilterPersons
