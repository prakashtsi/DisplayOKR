// npm imports
import React, { useContext, useState, useEffect, useRef } from 'react';

// custom imports
import { DbData } from '../App';
import ResultsList from './../Components/ResultsList';
import CategoriesFilter from './../Components/CategoriesFilter';

const ObjectivesKeyResults  = () => {

    // Getting Context data
    const Dbresponse = useContext(DbData);
    // Objectives & Results list
    const [ okrResults, setOkrResults ] = useState([])
    // Category list
    const [ categories, setCategories ] = useState([])
    // Temp category & Key results to be used during filter
    let tempCategories = useRef(new Set());
    let tempKeyResults = useRef([]);

    /*
    * Creating JSON struture from the api response
    * Filtering Objectives by 'parent_objective_id' and pushing Key Results inside it
    * Filtering Categories list to be used as filter later on
    */
    useEffect(() => {
        const categories = new Set()
        let okrResults = Dbresponse.reduce((acc, currentValue, index, dataArr) => {
            if (!currentValue.parent_objective_id) {
            acc[currentValue.id] = {
                ...currentValue,
                ['keyResults']: dataArr.filter(item => currentValue.id === item.parent_objective_id)
            }
            }
            categories.add(currentValue.category)
            return acc
        }, {})

        tempKeyResults.current = Object.values(okrResults)

        setCategories(Array.from(categories));
        setOkrResults(Object.values(okrResults));
    }, [Dbresponse]);
  
    /*
    * Pushing selected category to an array
    * Filtering Objectives by the selected array
    */
    const filterByCategory = (e, category) => {
      let selectedCategories = [], filteredKeyResults = []
  
      if (e.target.checked) {
        tempCategories.current.add(category)
      } else {
        tempCategories.current.delete(category)
      }
  
      selectedCategories = Array.from(tempCategories.current)
  
      if (selectedCategories.length > 0) {
        filteredKeyResults = tempKeyResults.current.filter(parent => selectedCategories.includes(parent.category))
      }

      setOkrResults(selectedCategories.length > 0 ? filteredKeyResults : tempKeyResults.current)
    }

    // Intial display when an api call is happening
    if (okrResults.length === 0) {
        return 'Loading Key Results'
    }

    return (
        <div className="App">
            <CategoriesFilter categories={categories} filterByCategory={filterByCategory} />
            <ResultsList list={okrResults} />
        </div>
    )
}


export default ObjectivesKeyResults;